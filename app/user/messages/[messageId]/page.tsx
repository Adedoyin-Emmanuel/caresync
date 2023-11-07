import Button from "@/app/components/Button";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";

const Messages = () => {
  return (
    <div className="w-screen h-screen bg-zinc-50">
      <SidebarLayout>
        <section className="my-5">
          <section className="messages-section my-5 w-full lg:w-1/2 lg:mx-auto">
            <section className="user-details flex items-center w-full gap-x-5 p-1">
              <div className="avatar online">
                <div className="w-12 rounded-full">
                  <img src="https://api.dicebear.com/7.x/micah/svg?seed=bloom" />
                </div>
              </div>

              <Text className="font-semibold">Fasakin henry</Text>
            </section>
            <section className="network-tab w-full items-center justify-center my-5">
              <Text className="text-red-500 text-sm text-center">
                no internet connection
              </Text>
            </section>
            <section className="h-screen w-full flex flex-col">
              <div className="flex-grow p-3  overflow-y-auto">
                <div className="mb-4 receiver">
                  <div className="max-w-[70%] bg-slate-100 p-4 rounded-md text-sm">
                    Hi, emmanuel. How are you doing today?
                  </div>
                </div>

                <div className="mb-4 sender">
                  <div className="max-w-[70%] bg-purple-200  p-4 rounded-md ml-auto text-sm">
                    What's up chief? Am good.
                  </div>
                </div>

            

                <div className="mb-4 receiver">
                  <div className="max-w-[70%] bg-slate-100 p-4 rounded-md text-sm">
                 I dey my bro. How far with the project? Your babe nko?
                  </div>
                </div>
                <div className="my-10 md:p-2 w-full ">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full border border-gray-300 p-4 rounded-[30px]"
                  />
                </div>
              </div>
            </section>
          </section>
        </section>
      </SidebarLayout>
    </div>
  );
};

export default Messages;