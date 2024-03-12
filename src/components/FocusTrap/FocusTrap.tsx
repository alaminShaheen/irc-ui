import { ReactNode, useEffect, useRef } from "react";

interface FocusTrapProps {
	children: ReactNode;
	className?: string
}

const FocusTrap = ({ children, className }: FocusTrapProps) => {
	const trapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const focusableElements = trapRef.current?.querySelectorAll(
			'a[href]:not([disabled]), button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
		);
		const visibleFocusableElements = focusableElements
			? Array.from(focusableElements).filter((element: any) => {
					const style = window.getComputedStyle(element);
					return (
						style.display !== 'none' &&
						style.visibility !== 'hidden' &&
						element.offsetWidth > 0 &&
						element.offsetHeight > 0
					);
			  })
			: [];

		const firstFocusableElement = visibleFocusableElements?.[0] as HTMLElement;
		const lastFocusableElement = visibleFocusableElements?.[
			visibleFocusableElements?.length - 1
		] as HTMLElement;

		const handleKeyDown = (event: KeyboardEvent) => {
			const isTabPressed = event.key === 'Tab' || event.keyCode === 9;

			if (!isTabPressed) {
				return;
			}

			if (event.shiftKey) {
				if (document.activeElement === firstFocusableElement) {
					lastFocusableElement.focus();
					event.preventDefault();
				}
			} else {
				if (document.activeElement === lastFocusableElement) {
					firstFocusableElement.focus();
					event.preventDefault();
				}
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return <div ref={trapRef} className={className}>{children}</div>;
};

export default FocusTrap;
