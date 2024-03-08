const SidebarContents = () => {
  return (
    <ul className="menu px-6 py-4 w-[550px] min-h-full text-base-content bg-primary gap-y-4 text-left">
      <li className="pl-0 ml-0">
        <div className="text-sm text-gray-400 pl-0 ml-0">
          Policy Information
        </div>
        <ul className="text-left pl-0 ml-0">
          <li>Frequently Asked Questions</li>
          <li>Policy Wording</li>
          <li>Summary of Coverage</li>
          <li>Activities & Events</li>
        </ul>
      </li>

      <li>
        <div className="text-sm text-gray-400 pl-0 ml-0">
          Tools & Forms
        </div>
        <ul className="text-left pl-0 ml-0">
          <li>Submit External Certificate</li>
          <li>External Certificate</li>
          <li>Claim Form</li>
        </ul>
      </li>
      <li className="bg-white"></li>
      <li>Importance of Waivers</li>
      <li>Concussion Training</li>
      <li>Concussion Management</li>
      <li>Waiver of Minor Participants</li>
      <li>Waiver of Adult Participants</li>
      <li className="bg-white"></li>
    </ul>
  );
};

export default SidebarContents;
