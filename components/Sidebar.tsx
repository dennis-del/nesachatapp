interface SidebarProps {
    username: string;
  }
  
  export default function Sidebar({ username }: SidebarProps) {
    return (
      <div className="w-1/4 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-semibold mb-6">Chats</h2>
  
        <div className="bg-gray-800 p-3 rounded-lg mb-4">
          Logged in as:
          <div className="font-bold mt-1">{username}</div>
        </div>
  
        <div className="space-y-3">
          <div className="bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-gray-700">
            General Room
          </div>
          <div className="bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-gray-700">
            Developers
          </div>
        </div>
      </div>
    );
  }
  