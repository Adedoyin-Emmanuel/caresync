import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";

const Settings = () => {
  return (
    <div className="w-screen h-screen bg-zinc-50">
      <SidebarLayout>
        <section className="appointments my-5">
          <h3 className="font-bold text-2xl capitalize text-accent">
            Settings
          </h3>
          <Text className="text-sm">change your settings</Text>
          <section className="settings-section">
            <section className="profile-container  w-full flex items-center justify-center">
              <section className="profile-section w-full p-2 my-5 flex items-center md:justify-center gap-x-5 md:gap-x-20">
                <div className="avatar cursor-pointer">
                  <div className="w-16 rounded-full">
                    <img
                      className=""
                      src="https://api.dicebear.com/7.x/micah/svg?seed=micah"
                      alt="user profile image"
                    />
                  </div>
                </div>
                <section className="user-info">
                  <h3 className="font-bold capitalize flex items-center gap-x-1">
                    Adedoyin Emmanuel
                    <span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="dodgerblue"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.5609 10.7386L20.2009 9.15859C19.9409 8.85859 19.7309 8.29859 19.7309 7.89859V6.19859C19.7309 5.13859 18.8609 4.26859 17.8009 4.26859H16.1009C15.7109 4.26859 15.1409 4.05859 14.8409 3.79859L13.2609 2.43859C12.5709 1.84859 11.4409 1.84859 10.7409 2.43859L9.17086 3.80859C8.87086 4.05859 8.30086 4.26859 7.91086 4.26859H6.18086C5.12086 4.26859 4.25086 5.13859 4.25086 6.19859V7.90859C4.25086 8.29859 4.04086 8.85859 3.79086 9.15859L2.44086 10.7486C1.86086 11.4386 1.86086 12.5586 2.44086 13.2486L3.79086 14.8386C4.04086 15.1386 4.25086 15.6986 4.25086 16.0886V17.7986C4.25086 18.8586 5.12086 19.7286 6.18086 19.7286H7.91086C8.30086 19.7286 8.87086 19.9386 9.17086 20.1986L10.7509 21.5586C11.4409 22.1486 12.5709 22.1486 13.2709 21.5586L14.8509 20.1986C15.1509 19.9386 15.7109 19.7286 16.1109 19.7286H17.8109C18.8709 19.7286 19.7409 18.8586 19.7409 17.7986V16.0986C19.7409 15.7086 19.9509 15.1386 20.2109 14.8386L21.5709 13.2586C22.1509 12.5686 22.1509 11.4286 21.5609 10.7386ZM16.1609 10.1086L11.3309 14.9386C11.1909 15.0786 11.0009 15.1586 10.8009 15.1586C10.6009 15.1586 10.4109 15.0786 10.2709 14.9386L7.85086 12.5186C7.56086 12.2286 7.56086 11.7486 7.85086 11.4586C8.14086 11.1686 8.62086 11.1686 8.91086 11.4586L10.8009 13.3486L15.1009 9.04859C15.3909 8.75859 15.8709 8.75859 16.1609 9.04859C16.4509 9.33859 16.4509 9.81859 16.1609 10.1086Z"
                          fill="#C0A3F5"
                        ></path>
                      </svg>
                    </span>
                  </h3>
                  <Text className="text-sm font-bold" noCapitalize>
                    @doyin
                  </Text>
                  <Text className="text-sm">i am twenty eight 🚀</Text>
                </section>
              </section>
            </section>
          </section>
        </section>
      </SidebarLayout>
    </div>
  );
};

export default Settings;
