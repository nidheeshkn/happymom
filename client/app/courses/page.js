"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import antiage from "@/public/antiaging.png";
import sls from "@/public/sls.png";
import fam from "@/public/fam.png";
import mindtra from "@/public/mindtra.png";
import speaking from "@/public/publicspeaking.png";
import city from "@/public/med.jpeg";
import couples from "@/public/couples.png";
import ta from "@/public/ta.png";
import course from "@/public/happymom.png";
import pre from "@/public/premarital.jpeg";

import Ham from "@/app/(components)/Ham";
import BottomNavbar from "@/app/(components)/BottomNavbar";

function Courses() {
  // const [link, setLink] = useState("");

  const router = useRouter();

  return (
    <div>
      <div>
        <Ham />
      </div>
      <div className="w-full flex justify-center pt-3 ">
        <span className="text-xl font-semibold   "> Courses</span>
      </div>

      <div className="w-full px-5 mt-3 ">
        <div>
          <div className="max-h-80vh">
            <div className="w-full h-36 bg-blue-400 flex flex-col justify-center text-white text-xl rounded-md">
              <div></div>

              <div
                className="flex justify-between items-center px-3 rounded-md"
                onClick={() => {
                  router.push(
                    " https://mwpfn.on-app.in/app/oc/253120/mwpfn?utm_source%3Dwhatsapp%26utm_medium%3Dtutor-course-referral-wa%26utm_campaign%3Dcourse-overview-app"
                  );
                }}
              >
                <div className="h-full flex items-end">
                  <Image
                    alt="mindful meditation"
                    src={city}
                    height={110}
                    width={110}
                  />
                </div>
                <div className="flex flex-col items-center ">
                  <span className="text-[1rem] font-semibold">
                    Mindful meditation (1 year){" "}
                  </span>

                  <span className="text-[1rem] font-semibold">200 RS</span>
                </div>
              </div>
            </div>

            <div className="w-full h-36 bg-blue-400 flex flex-col justify-center text-white text-xl rounded-md mt-5">
              <div></div>

              <div
                className="flex justify-between items-center px-3 rounded-md"
                onClick={() => {
                  router.push(
                    "https://mwpfn.on-app.in/app/oc/205006/mwpfn?utm_source%3Dwhatsapp%26utm_medium%3Dtutor-course-referral-wa%26utm_campaign%3Dcourse-overview-app"
                  );
                }}
              >
                <div className="h-full flex items-end">
                  <Image
                    alt="Marriage myths"
                    src={couples}
                    height={110}
                    width={110}
                  />
                </div>
                <div className="flex flex-col items-center ">
                  <span className="text-[1rem] font-semibold">
                    10 Myths on Marriage{" "}
                  </span>

                  <span className="text-[1rem] font-semibold">200 RS</span>
                </div>
              </div>
            </div>
            <div className="w-full h-36 bg-blue-400 flex flex-col justify-center text-white text-xl rounded-md mt-5">
              <div></div>

              <div
                className="flex justify-between items-center px-3 rounded-md"
                onClick={() => {
                  router.push(
                    "https://mwpfn.on-app.in/app/oc/216530/mwpfn?utm_source%3Dwhatsapp%26utm_medium%3Dtutor-course-referral-wa%26utm_campaign%3Dcourse-overview-app"
                  );
                }}
              >
                <div className="h-full flex items-end">
                  <Image
                    alt="Premarital Counselling"
                    src={pre}
                    height={110}
                    width={110}
                    className="rounded-xl"
                  />
                </div>
                <div className="flex flex-col items-center ">
                  <span className="text-[0.9rem] font-semibold flex">
                    Premarital Counselling (Islam)
                  </span>

                  <span className="text-[1rem] font-semibold">1000 RS</span>
                </div>
              </div>
            </div>

            <div className="w-full h-36 bg-blue-400 flex flex-col justify-center text-white text-xl rounded-md mt-5">
              <div></div>

              <div
                className="flex justify-between items-center px-3 rounded-md"
                onClick={() => {
                  router.push(
                    "https://mwpfn.on-app.in/app/oc/457782/mwpfn?utm_source%3Dwhatsapp%26utm_medium%3Dtutor-course-referral-wa%26utm_campaign%3Dcourse-overview-app"
                  );
                }}
              >
                <div className="h-full flex items-end">
                  <Image
                    alt="Happymom"
                    src={course}
                    height={110}
                    width={110}
                    className="rounded-xl"
                  />
                </div>
                <div className="flex flex-col items-center ">
                  <span className="text-[1rem] font-semibold">Happymom</span>

                  <span className="text-[1rem] font-semibold">600 RS</span>
                </div>
              </div>
            </div>

            {/* <div className="w-full h-36 bg-blue-400 flex flex-col justify-center text-white text-xl mt-5 rounded-md">
              <div></div>

              <div className="flex justify-between items-center px-3 rounded-md" onClick={()=>{
                

                router.push("https://mwpfn.on-app.in/app/oc/234365/mwpfn?utm_source%3Dwhatsapp%26utm_medium%3Dtutor-course-referral-wa%26utm_campaign%3Dcourse-overview-app")
              }}>
                <Image src={antiage} height={110} width={110} />

                <div className="flex flex-col items-center ">
                  <span className="text-[1rem] font-semibold">Anti Aging</span>

                  <span className="text-[1rem] font-semibold">600 RS</span>
                </div>
              </div>
            </div> */}
            <div className="w-full h-36 bg-blue-400 flex flex-col justify-center text-white text-xl mt-5 rounded-md">
              <div></div>

              <div
                className="flex justify-between items-center px-3 rounded-md"
                onClick={() => {
                  router.push(
                    "https://mwpfn.on-app.in/app/oc/234365/mwpfn?utm_source%3Dwhatsapp%26utm_medium%3Dtutor-course-referral-wa%26utm_campaign%3Dcourse-overview-app"
                  );
                }}
              >
                <Image
                  alt="Anti Aging"
                  src={antiage}
                  height={110}
                  width={110}
                />

                <div className="flex flex-col items-center ">
                  <span className="text-[1rem] font-semibold">Anti Aging</span>

                  <span className="text-[1rem] font-semibold">600 RS</span>
                </div>
              </div>
            </div>

            <div className="w-full h-36 bg-blue-400 flex flex-col justify-center text-white text-xl mt-5 rounded-md">
              <div></div>

              <div
                className="flex justify-between items-center px-3 rounded-md"
                onClick={() => {
                  router.push(
                    "https://mwpfn.on-app.in/app/oc/208923/mwpfn?utm_source%3Dwhatsapp%26utm_medium%3Dtutor-course-referral-wa%26utm_campaign%3Dcourse-overview-app"
                  );
                }}
              >
                <Image
                  alt="SLS Mindful Yoganidras"
                  src={sls}
                  height={150}
                  width={150}
                />
                <div className="flex flex-col items-center ">
                  <span className="text-[1rem] font-semibold">
                    SLS Mindful Yoganidra
                  </span>

                  <span className="text-[1rem] font-semibold">600 RS</span>
                </div>
              </div>
            </div>

            <div className="w-full h-36  bg-blue-400 flex flex-col justify-center text-white text-xl my-5 rounded-md">
              <div></div>

              <div
                className="flex justify-between items-center px-3 rounded-md"
                onClick={() => {
                  router.push(
                    "https://mwpfn.on-app.in/app/oc/207244/mwpfn?utm_source%3Dwhatsapp%26utm_medium%3Dtutor-course-referral-wa%26utm_campaign%3Dcourse-overview-app"
                  );
                }}
              >
                <Image alt="Family Life Cycle" src={fam} height={110} />

                <div className="flex flex-col items-center ">
                  <span className="text-[1rem] font-semibold">
                    Family Life Cycle
                  </span>

                  <span className="text-[1rem] font-semibold">600 RS</span>
                </div>
              </div>
            </div>

            <div className="w-full h-36  bg-blue-400 flex flex-col justify-center text-white text-xl my-5 rounded-md">
              <div></div>

              <div
                className="flex justify-between items-center px-3 rounded-md"
                onClick={() => {
                  router.push(
                    "https://mwpfn.on-app.in/app/oc/198305/mwpfn?utm_source%3Dwhatsapp%26utm_medium%3Dtutor-course-referral-wa%26utm_campaign%3Dcourse-overview-app"
                  );
                }}
              >
                <Image alt="Transactional analysis" src={ta} height={110} />

                <div className="flex flex-col items-center ">
                  <span className="text-[1rem] font-semibold">
                    Transactional analysis
                  </span>

                  <span className="text-[1rem] font-semibold">2000 RS</span>
                </div>
              </div>
            </div>

            <div className="w-full h-36  bg-blue-400 flex flex-col justify-center text-white text-xl my-5 rounded-md">
              <div></div>

              <div
                className="flex justify-between items-center px-3 rounded-md"
                onClick={() => {
                  setPayment(true);
                }}
              >
                <Image alt="Public Speaking" src={speaking} height={110} />

                <div className="flex flex-col items-center ">
                  <span className="text-[1rem] font-semibold">
                    Public Speaking
                  </span>

                  <span className="text-[1rem] font-semibold">2000 RS</span>
                </div>
              </div>
            </div>
            <div className="w-full h-36 mb-[5rem] bg-blue-400 flex flex-col justify-center text-white text-xl my-5 rounded-md">
              <div></div>

              <div
                className="flex justify-between items-center px-3 rounded-md"
                onClick={() => {
                  router.push(
                    "ttps://mwpfn.on-app.in/app/oc/198305/mwpfn?utm_source%3Dwhatsapp%26utm_medium%3Dtutor-course-referral-wa%26utm_campaign%3Dcourse-overview-app"
                  );
                }}
              >
                <Image alt="Mind Trance" src={mindtra} height={110} />

                <div className="flex flex-col items-center ">
                  <span className="text-[1rem] font-semibold">Mind Trance</span>

                  <span className="text-[1rem] font-semibold">2000 RS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="fixed w-[100vw] h-[100vh]  z-[60] top-0 px-5 flex justify-center items-center">
  <div className="text-white flex flex-col items-center">
    
    
    
    <div className="text-semibold font-xl flex justify-center items-center">Pay this number and send screen shot to the same number to enroll in this course</div>
 

<div className="text-semibold text-2xl font-extrabold mt-4">940056815</div>
<div className="text-semibold text-2xl font-extrabold mt-4">2000 Rs</div>
  </div>

</div> */}
      <div className="w-full h-16 bg-[#4F95FF] fixed z-10 bottom-0 flex justify-between items-center px-5">
        <BottomNavbar />
      </div>
    </div>
  );
}

export default Courses;
