import { Input } from "@/components/ui/input";

const UserFormInfo = ({ setUserName, setUserEmail, setUserNote }) => {
  return (
    <div className="flex flex-col gap-3 p-4 px-8">
      <h2 className="text-xl font-bold">Enter Details</h2>
      <div>
        <h2>Name *</h2>
        <Input onChange={(e) => setUserName(e.target.value)} />
      </div>
      <div>
        <h2>Email *</h2>
        <Input onChange={(e) => setUserEmail(e.target.value)} />
      </div>
      <div>
        <h2>Share any Notes </h2>
        <Input onChange={(e) => setUserNote(e.target.value)} />
      </div>
      <div>
        <h2 className="text-xs text-gray-400">
          By Proceeding, you confirm that you read and agree on our terms
        </h2>
      </div>
    </div>
  );
};
export default UserFormInfo;
