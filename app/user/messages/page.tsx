import Button from "@/app/components/Button";
import SidebarLayout from "@/app/components/SidebarLayout";
import Text from "@/app/components/Text";
import ActiveHospitals from "@/app/components/ActiveHospitals/ActiveHospitals";

const Messages = () => {
  return (
    <div className="w-screen h-screen bg-zinc-50">
      <SidebarLayout>
        <section className="appointments my-5">
          <h3 className="font-bold text-2xl capitalize text-accent">
            messages
          </h3>
          <Text className="text-sm">Your messages with hospitals</Text>

          <section className="messages-section my-5">
            <section className="search-hospitals"></section>

            <section className="message-area">
                <ActiveHospitals/>

              <section className="all-messages my-5">
                <section className="message-one flex items-center gap-x-3 my-4 cursor-pointer hover:bg-purple-100 transition-colors duration-100 ease-in p-2">
                  <div className="avatar online">
                    <div className="w-14 rounded-full">
                      <img src="https://api.dicebear.com/7.x/micah/svg?seed=bloom" />
                    </div>
                  </div>
                  <div className="message-content">
                    <h2 className="font-bold capitalize flex items-center gap-x-1">
                      bloomcare
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
                    </h2>
                    <Text className="text-[12px]">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quaerat, quibusdam....
                    </Text>
                  </div>
                </section>

                <section className="message-two flex items-center gap-x-3 my-4 cursor-pointer hover:bg-purple-100 transition-colors duration-100 ease-in p-2">
                  <div className="avatar offline">
                    <div className="w-14 rounded-full">
                      <img src="https://api.dicebear.com/7.x/micah/svg?seed=jefis" />
                    </div>
                  </div>
                  <div className="message-content">
                    <h3 className="font-bold capitalize">jefis</h3>
                    <Text className="text-[12px]">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quaerat, quibusdam....
                    </Text>
                  </div>
                </section>

                <section className="message-three flex items-center gap-x-3 my-4 cursor-pointer hover:bg-purple-100 transition-colors duration-100 ease-in p-2">
                  <div className="avatar online">
                    <div className="w-14 rounded-full">
                      <img src="https://api.dicebear.com/7.x/micah/svg?seed=t" />
                    </div>
                  </div>
                  <div className="message-content">
                    <h2 className="font-bold capitalize flex items-center gap-x-1">
                      mayfair
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
                    </h2>
                    <Text className="text-[12px]">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quaerat, quibusdam....
                    </Text>
                  </div>
                </section>
              </section>
            </section>
          </section>
        </section>
      </SidebarLayout>
    </div>
  );
};

export default Messages;
