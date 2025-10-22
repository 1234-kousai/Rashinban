"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="bg-white">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white h-20 relative overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto h-full relative">
          {/* Nav Items - right side */}
          <div className="absolute right-28 top-[30px] flex gap-[50px] text-lg leading-normal">
            <a href="#" className="text-neutral-900 hover:text-primary">
              Home
            </a>
            <a href="#" className="text-neutral-900 hover:text-primary">
              About Us
            </a>
            <a href="#" className="text-neutral-900 hover:text-primary">
              Projects
            </a>
            <a href="#" className="text-neutral-900 hover:text-primary">
              Services
            </a>
            <a href="#" className="font-semibold text-secondary hover:opacity-80">
              Contact Us
            </a>
          </div>

          {/* Logo with decoration - left side */}
          <div className="absolute left-28 top-[22px]">
            {/* Random Symboles decoration - positioned absolutely */}
            <div className="absolute w-12 h-12 pointer-events-none">
              <Image src="/assets/41a98b88102502d3c6cec122fddef099043efe8a.svg" alt="" width={19} height={11} className="absolute top-[33px] left-[12px]" />
              <Image src="/assets/61cb0ed8ecf2cf84821a6eb9cd5e2051c34fc39c.svg" alt="" width={18} height={8} className="absolute top-[13px] left-[12px]" />
              <Image src="/assets/340dd3ac461322f02a6971897207ec64200d0647.svg" alt="" width={7} height={15} className="absolute top-[28px] left-[9px]" />
              <Image src="/assets/caa924e875e75de0bd57cb7e4978822d99abab1d.svg" alt="" width={19} height={22} className="absolute top-[22px] left-[12px]" />
              <Image src="/assets/5b210e843b3a7890bbb5c0f80ddb50eee79df84d.svg" alt="" width={18} height={16} className="absolute top-[13px] left-[8px]" />
              <Image src="/assets/a2cfc15aa3275c054b181dbf7aa54cd05376dadc.svg" alt="" width={19} height={35} className="absolute top-[22px] left-[6px]" />
            </div>
            <p className="font-bold italic text-[30px] text-primary leading-normal ml-[52px]">
              The<span className="not-italic">Box</span>
            </p>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="h-[646px] relative overflow-hidden block">
        <Image
          src="/assets/522e6a5f380cba7232041d621d835a77aaeaf072.png"
          alt="Hero Background"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.9) 16.585%, rgba(255,255,255,0) 72.384%)",
          }}
        />

        <div className="max-w-[1440px] mx-auto h-full relative">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="absolute left-[calc(20.833%-188px)] top-[239px] text-[72px] font-semibold leading-normal text-neutral-800 w-[556px]"
          >
            Building things is our mission.
          </motion.h1>

          {/* Feature Project */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute bottom-10 right-0 w-[416px]"
          >
            <div className="bg-[#3559c7] rounded-t-[2px] px-[10px] py-5 pb-[10px] flex flex-col gap-5 items-center text-white text-center h-[150px]">
              <p className="font-bold text-xl leading-normal">Feature Projects</p>
              <p className="text-2xl leading-normal w-[312px] h-[61px]">
                The National University of Architecture
              </p>
            </div>
            <div className="flex h-10">
              <button className="bg-neutral-800 w-[208px] text-white text-lg flex items-center justify-center gap-[10px] px-5 py-1 overflow-hidden">
                <span className="leading-normal">Back</span>
                <Image
                  src="/assets/26c9f2977fa59b9ed6318be31aed0536035626f7.svg"
                  alt="Arrow"
                  width={26}
                  height={17}
                />
              </button>
              <button className="bg-neutral-800 w-[207px] text-white text-lg flex items-center justify-center gap-[10px] px-5 py-1 overflow-hidden">
                <Image
                  src="/assets/762a4f982c7e562c3187091f9952d7ed888f2920.svg"
                  alt="Arrow"
                  width={26}
                  height={17}
                />
                <span className="leading-normal">Next</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Reputation */}
      <section className="bg-white py-[60px] overflow-hidden">
        <div className="w-full min-w-[1440px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center text-heading-4 text-neutral-800 leading-normal mb-[92px]"
          >
            Our Reputation
          </motion.h2>

          <div className="flex justify-center gap-[63px] px-[120px]">
            {/* Left card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white border-[1.4px] border-solid border-neutral-100 rounded-[4px] pb-10 pt-5 px-5 flex flex-col gap-[18px] items-start w-[292px]"
            >
              <div className="w-10 h-10 relative overflow-hidden">
                <div className="absolute inset-[4.17%]">
                  <Image src="/assets/112e73a57b2e94b8ce3dfdef856ce976d23ca2ea.svg" alt="" fill className="object-contain" />
                </div>
              </div>
              <h3 className="font-bold text-xl leading-normal text-neutral-700">Best Services</h3>
              <p className="text-neutral-400 text-base leading-normal w-[254px]">Nullam senectus porttitor in eget. Eget rutrum leo interdum.</p>
            </motion.div>

            {/* Center card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white border-[1.4px] border-solid border-neutral-100 rounded-[4px] pb-10 pt-5 px-5 flex flex-col gap-[18px] items-start w-[292px]"
            >
              <div className="w-10 h-10 relative overflow-hidden">
                <div className="absolute inset-[4.17%]">
                  <Image src="/assets/112e73a57b2e94b8ce3dfdef856ce976d23ca2ea.svg" alt="" fill className="object-contain" />
                </div>
              </div>
              <h3 className="font-bold text-xl leading-normal text-neutral-700">Best Teams</h3>
              <p className="text-neutral-400 text-base leading-normal w-[254px]">Cursus semper tellus volutpat aliquet lacus. </p>
            </motion.div>

            {/* Right card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white border-[1.4px] border-solid border-neutral-100 rounded-[4px] pb-10 pt-5 px-5 flex flex-col gap-[18px] items-start w-[292px]"
            >
              <div className="w-10 h-10 relative overflow-hidden">
                <div className="absolute inset-[9.208%]">
                  <Image src="/assets/1314a88b7ebf1eb3d4adc14cc32306b468412fe2.svg" alt="" fill className="object-contain" />
                </div>
              </div>
              <h3 className="font-bold text-xl leading-normal text-neutral-700">Best Designs</h3>
              <p className="text-neutral-400 text-base leading-normal w-[254px]">Ultricies at ipsum nunc, tristique nam lectus.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="bg-white py-[138px] overflow-hidden">
        <div className="w-full min-w-[1440px] relative h-[669px]">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="absolute left-[120px] top-0 w-[902px] h-[669px] rounded-[2px] shadow-[0px_20px_24px_-4px_rgba(17,24,39,0.1),0px_8px_8px_-4px_rgba(17,24,39,0.04)]"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[2px]">
              <Image
                src="/assets/ba3b33a387a6fb6a79f6ebda83f9824c72dc2d4b.png"
                alt="About Us"
                width={1148}
                height={765}
                className="absolute h-[114.35%] left-[-17.73%] max-w-none top-[-10.02%] w-[127.18%]"
              />
            </div>
          </motion.div>

          {/* Blue Box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="absolute right-[120px] top-[147px] bg-primary w-[488px] h-[523px] rounded-[2px] shadow-[0px_20px_24px_-4px_rgba(17,24,39,0.1),0px_8px_8px_-4px_rgba(17,24,39,0.04)] overflow-clip"
          >
            <p className="absolute left-10 top-[50px] text-heading-4 text-white leading-normal font-bold">About us</p>
            <p className="absolute left-10 top-[129px] text-xl text-white leading-normal w-[388px]">
              For more than 30 years we have been delivering world-class construction and we&apos;ve built many lasting relationships along the way. <br /><br />
              We&apos;ve matured into an industry leader and trusted resource for those seeking quality, innovation and reliability when building in the U.S.
            </p>
            <div className="absolute left-10 top-[410px] bg-white border-2 border-primary border-solid px-5 py-4 rounded-md flex items-center justify-center gap-[10px]">
              <p className="font-semibold text-lg text-primary text-center leading-normal">More on Our History</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-neutral-50 h-[608px] overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto h-full relative">
          <h2 className="absolute left-[calc(41.667%+44px)] right-[calc(41.667%+45px)] text-center top-11 text-heading-4 text-neutral-800 leading-normal">
            Services
          </h2>

          {/* Row 1 */}
          {/* Construction */}
          <div className="absolute left-[calc(8.333%+96px)] top-[122px] bg-white p-5 rounded shadow-[0px_0px_37px_-2px_rgba(17,24,39,0.05)] h-[181px] w-[271px] flex flex-col items-center justify-center gap-5">
            <div className="w-10 h-10 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-[58.33%] h-[58.33%] bg-[#7595fd]" />
              <div className="absolute inset-[8.33%_12.5%_8.33%_8.34%]">
                <Image src="/assets/1102ba2e18d71fd823bd6cd489e4e3099ab6f39f.svg" alt="" fill className="object-contain" />
              </div>
              <div className="absolute inset-[62.5%_62.5%_29.17%_29.17%]">
                <Image src="/assets/a1fa079092540e4007d66ceec9f4e2ac609cafde.svg" alt="" fill className="object-contain" />
              </div>
            </div>
            <div className="w-[60px] h-0.5 bg-neutral-100" />
            <p className="text-xl font-semibold text-primary text-center leading-normal">Construction</p>
          </div>

          {/* Renovation */}
          <div className="absolute left-[calc(33.333%+105px)] top-[122px] bg-primary p-5 rounded shadow-[0px_0px_37px_-2px_rgba(17,24,39,0.05)] h-[181px] w-[271px] flex flex-col items-center justify-center gap-5">
            <div className="w-10 h-10 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-[58.33%] h-[58.33%] bg-[#7595fd]" />
              <div className="absolute inset-[8.33%_8.33%_8.33%_12.5%]">
                <Image src="/assets/29b696f3e1665259ef6c1a161b5032e552ee0fef.svg" alt="" fill className="object-contain" />
              </div>
            </div>
            <div className="w-[60px] h-0.5 bg-neutral-100" />
            <p className="text-xl font-semibold text-white text-center leading-normal">Renovation</p>
          </div>

          {/* Consultation */}
          <div className="absolute left-[calc(66.667%-6px)] top-[122px] bg-white p-5 rounded shadow-[0px_0px_37px_-2px_rgba(17,24,39,0.05)] h-[181px] w-[270px] flex flex-col items-center justify-center gap-5">
            <div className="w-10 h-10 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-[58.33%] h-[58.33%] bg-[#7595fd]" />
              <div className="absolute inset-[10.02%_10.08%_10.06%_10.08%]">
                <Image src="/assets/e16c90f1b437106be8f191785e435a103c0939d1.svg" alt="" fill className="object-contain" />
              </div>
            </div>
            <div className="w-[60px] h-0.5 bg-neutral-100" />
            <p className="text-xl font-semibold text-primary text-center leading-normal">Consultation</p>
          </div>

          {/* Row 2 */}
          {/* Repair Services */}
          <div className="absolute left-[calc(8.333%+96px)] top-[351px] bg-primary p-5 rounded shadow-[0px_0px_37px_-2px_rgba(17,24,39,0.05)] h-[181px] w-[271px] flex flex-col items-center justify-center gap-5">
            <div className="w-10 h-10 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-[58.33%] h-[58.33%] bg-[#7595fd]" />
              <div className="absolute inset-[16.67%_8.33%]">
                <Image src="/assets/7f3d8acf43007109c2aa2b24d6526a550f4a2306.svg" alt="" fill className="object-contain" />
              </div>
            </div>
            <div className="w-[60px] h-0.5 bg-neutral-100" />
            <p className="text-xl font-semibold text-white text-center leading-normal">Repair Services</p>
          </div>

          {/* Architecture */}
          <div className="absolute left-[calc(33.333%+105px)] top-[351px] bg-white p-5 rounded shadow-[0px_0px_37px_-2px_rgba(17,24,39,0.05)] h-[181px] w-[271px] flex flex-col items-center justify-center gap-5">
            <div className="w-10 h-10 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-[58.33%] h-[58.33%] bg-[#7595fd]" />
              <div className="absolute inset-[12.5%_26.46%_12.5%_26.5%]">
                <Image src="/assets/89211b87752a537161dcc15b405700e48ef12e03.svg" alt="" fill className="object-contain" />
              </div>
            </div>
            <div className="w-[60px] h-0.5 bg-neutral-100" />
            <p className="text-xl font-semibold text-primary text-center leading-normal">Architecture</p>
          </div>

          {/* Electric */}
          <div className="absolute left-[calc(66.667%-6px)] top-[351px] bg-primary p-5 rounded shadow-[0px_0px_37px_-2px_rgba(17,24,39,0.05)] h-[181px] w-[270px] flex flex-col items-center justify-center gap-5">
            <div className="w-10 h-10 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-[58.33%] h-[58.33%] bg-[#7595fd]" />
              <div className="absolute bottom-[16.67%] left-[41.67%] right-[12.5%] top-1/2">
                <Image src="/assets/42d4cacd435a23e4b81c12244fe8acbcb2c21efb.svg" alt="" fill className="object-contain" />
              </div>
              <div className="absolute bottom-[29.17%] left-[12.5%] right-1/2 top-[16.67%]">
                <Image src="/assets/c9b66e9544c448c6ad1318821744b0c41797fe19.svg" alt="" fill className="object-contain" />
              </div>
            </div>
            <div className="w-[60px] h-0.5 bg-neutral-100" />
            <p className="text-xl font-semibold text-white text-center leading-normal">Electric</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white h-[723px] relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto h-full relative">
          {/* Left side stats */}
          <div className="absolute left-[calc(25%+32.5px)] top-[221px] -translate-x-1/2 bg-white border border-white rounded-[4px] p-[30px] w-[361px] flex flex-col gap-[2px]">
            <div className="flex flex-col h-[65px] justify-end leading-[0] text-[72px] font-semibold text-neutral-800 w-[115px]">
              <p className="leading-normal">123</p>
            </div>
            <div className="flex gap-3 items-center pl-4 w-[273px]">
              <div className="w-[7px] h-full bg-secondary" />
              <p className="text-2xl text-neutral-500 w-[238px]">Projects Completed</p>
            </div>
          </div>

          <div className="absolute left-[calc(45.833%-8px)] top-[122px] -translate-x-1/2 bg-white border border-white rounded-[4px] p-[30px] w-[280px] flex flex-col gap-[2px]">
            <div className="flex flex-col h-[65px] justify-end leading-[0] text-[72px] font-semibold text-neutral-800 w-[115px]">
              <p className="leading-normal">84</p>
            </div>
            <div className="flex gap-3 items-center pl-4 w-[273px]">
              <div className="w-[7px] h-full bg-secondary" />
              <p className="text-2xl text-neutral-500 w-[238px]">Happy Clients</p>
            </div>
          </div>

          <div className="absolute left-[calc(37.5%+56px)] top-[364px] -translate-x-1/2 bg-white border border-white rounded-[4px] p-[30px] w-[276px] flex flex-col gap-[2px]">
            <div className="flex flex-col h-[65px] justify-end leading-[0] text-[72px] font-semibold text-neutral-800 w-[115px]">
              <p className="leading-normal">37</p>
            </div>
            <div className="flex gap-3 items-center pl-4 w-[273px]">
              <div className="w-[7px] h-full bg-secondary" />
              <p className="text-2xl text-neutral-500 w-[238px]">Awards Win</p>
            </div>
          </div>

          <div className="absolute left-[calc(29.167%+7.5px)] top-[469px] -translate-x-1/2 bg-white border border-white rounded-[4px] p-[30px] flex flex-col gap-[2px]">
            <div className="flex flex-col h-[65px] justify-end leading-[0] text-[72px] font-semibold text-neutral-800 w-[115px]">
              <p className="leading-normal">30</p>
            </div>
            <div className="flex gap-3 items-center pl-4 w-[273px]">
              <div className="w-[7px] h-full bg-secondary" />
              <p className="text-2xl text-neutral-500 w-[238px]">Years in Business</p>
            </div>
          </div>

          {/* Illustrations */}
          <Image
            src="/assets/6e9a91091bc241cbdb3b4d11e910890e1b8fcaef.png"
            alt="illus"
            width={79}
            height={79}
            className="absolute left-[calc(12.5%+38.5px)] top-[172px] -translate-x-1/2"
          />
          <Image
            src="/assets/45ae3a838060ffdbf7a62dc788fd967a024d4335.png"
            alt="illus"
            width={84}
            height={84}
            className="absolute left-[calc(37.5%+51px)] top-[582px] -translate-x-1/2"
          />
          <Image
            src="/assets/3de872771f4000bb313182245651d05a0d2ddd87.png"
            alt="illus"
            width={93}
            height={93}
            className="absolute left-[calc(50%-11.5px)] top-[349px] -translate-x-1/2"
          />
          <Image
            src="/assets/98b21396e6c4886178eab4b6bc331d5494931d2e.png"
            alt="illus"
            width={97}
            height={97}
            className="absolute left-[calc(54.167%-8.5px)] top-[103px] -translate-x-1/2"
          />

          {/* Right side content */}
          <p className="absolute right-[496px] translate-x-full text-[60px] font-bold text-primary leading-normal top-[172px] w-[359px]">
            30 Years Experience
          </p>
          <p className="absolute right-[496px] translate-x-full text-xl text-neutral-600 leading-normal top-[352px] w-[330px] h-[74px]">
            Our company has been the leading provided construction services to clients throughout the USA since 1988.
          </p>
          <div className="absolute right-[calc(16.667%+80px)] top-[493px]">
            <Button>Contact Us</Button>
          </div>
        </div>
      </section>

      {/* Free Consultation */}
      <section className="h-[300px] relative overflow-hidden">
        <Image
          src="/assets/f00572a9e4c1d924a7af45ea22ff31a554b4eee0.png"
          alt="Consultation Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="max-w-[1440px] mx-auto h-full relative px-28 flex items-center justify-between">
          <div>
            <h2 className="text-heading-4 text-white mb-5">
              Free consultation with exceptional quality
            </h2>
            <p className="text-2xl text-white">
              Just one call away:{" "}
              <span className="underline">+84 1102 2703</span>
            </p>
          </div>
          <Button variant="outline">Get your consultation</Button>
        </div>
      </section>

      {/* Projects */}
      <section className="bg-white min-h-[1098px] overflow-hidden py-[88px]">
        <div className="max-w-[1440px] mx-auto px-28">
          <h2 className="text-heading-4 text-neutral-800 mb-[82px]">Projects</h2>

          <div className="flex gap-[32px]">
            {/* Menu */}
            <div className="flex flex-col gap-[48px]">
              {["All", "Commercial", "Residential", "Other"].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className={`w-1 h-7 ${
                      i === 0 ? "bg-primary" : "bg-transparent"
                    }`}
                  />
                  <p
                    className={`text-2xl ${
                      i === 0
                        ? "font-bold text-primary"
                        : "font-medium text-neutral-200"
                    }`}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Project Grid */}
            <div className="flex-1 grid grid-cols-2 gap-8">
              {[
                {
                  img: "/assets/089bf250bdd2caa4b33e7eb864d788a16c95da1e.png",
                  title: "Wildstone Infra Hotel",
                  location: "2715 Ash Dr. San Jose, South Dakota",
                },
                {
                  img: "/assets/f042d9f36de69d6d289fec45cc15040db6b8cb7c.png",
                  title: "Wish Stone Building",
                  location: "2972 Westheimer Rd. Santa Ana, Illinois",
                },
                {
                  img: "/assets/028a0cef1bf65382382cde195cc45b34a13e4399.png",
                  title: "Mr. Parkinston&apos;s House",
                  location: "3517 W. Gray St. Utica, Pennsylvania",
                },
                {
                  img: "/assets/efb357ca4521dda2f5a91dd1a02dbc47a02c9f36.png",
                  title: "Oregano Height",
                  location: "2464 Royal Ln. Mesa, New Jersey",
                },
              ].map((project, i) => (
                <div key={i} className="rounded overflow-hidden">
                  <div className="h-[247px] relative">
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-primary text-white p-3">
                    <h3 className="font-bold text-xl mb-3">{project.title}</h3>
                    <p className="text-lg">{project.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-8 mt-[64px]">
            <button className="bg-neutral-800 text-white px-5 py-4 h-16 w-[295px] flex items-center justify-center gap-2">
              <span>Back</span>
              <Image
                src="/assets/26c9f2977fa59b9ed6318be31aed0536035626f7.svg"
                alt="Arrow"
                width={26}
                height={17}
              />
            </button>
            <div className="flex gap-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="w-4 h-4 relative">
                  <Image
                    src={i === 0 ? "/assets/48ef74dad202a85e699dba48ca473a230e20028a.svg" : "/assets/8d468749cfd0036d52dda60c49c9cb3777fcb9db.svg"}
                    alt="Page indicator"
                    width={16}
                    height={16}
                  />
                </div>
              ))}
            </div>
            <button className="bg-neutral-800 text-white px-5 py-4 h-16 w-[295px] flex items-center justify-center gap-2">
              <Image
                src="/assets/762a4f982c7e562c3187091f9952d7ed888f2920.svg"
                alt="Arrow"
                width={26}
                height={17}
              />
              <span>Next</span>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-neutral-50 h-[632px] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-[360px] py-[60px]">
          <h2 className="text-heading-4 text-neutral-800 text-center mb-4">
            What can us do for you?
          </h2>
          <p className="text-xl text-neutral-800 text-center mb-[46px]">
            We are ready to work on a project of any complexity, whether it&apos;s
            commercial or residential.
          </p>

          <form className="space-y-[13px]">
            <div className="grid grid-cols-2 gap-8">
              <input
                type="text"
                placeholder="Your Name *"
                className="bg-white border border-neutral-100 rounded px-2 py-2.5 text-lg text-neutral-300"
              />
              <input
                type="email"
                placeholder="Email *"
                className="bg-white border border-neutral-100 rounded px-2 py-2.5 text-lg text-neutral-300"
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <select className="bg-white border border-neutral-100 rounded px-2 py-2.5 text-lg text-neutral-300">
                <option>Reason for Contacting *</option>
              </select>
              <input
                type="tel"
                placeholder="Phone"
                className="bg-white border border-neutral-100 rounded px-2 py-2.5 text-lg text-neutral-300"
              />
            </div>
            <textarea
              placeholder="Message"
              rows={5}
              className="w-full bg-white border border-neutral-100 rounded px-2 py-2.5 text-lg text-neutral-300"
            />
            <p className="text-base text-neutral-500">
              <span className="text-red-600">*</span> indicates a required field
            </p>
            <div className="flex justify-center pt-5 pb-8">
              <Button className="w-1/3">Submit</Button>
            </div>
          </form>
        </div>
      </section>

      {/* Bottom */}
      <section className="bg-white h-[377px] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-28 py-[85px]">
          <div className="grid grid-cols-2 gap-[200px]">
            {/* Left */}
            <div className="space-y-8">
              <div className="flex items-start gap-3">
                <p className="font-medium text-xl text-primary">Address:</p>
                <p className="font-normal text-xl text-neutral-800 capitalize">
                  6391 Elgin St. Celina, Delaware 10299
                </p>
              </div>
              <div className="flex items-start gap-[34px]">
                <p className="font-medium text-xl text-primary">Phone:</p>
                <p className="font-normal text-xl text-neutral-800 capitalize">
                  +84 1102 2703
                </p>
              </div>
              <div className="flex items-start gap-[41px]">
                <p className="font-medium text-xl text-primary">Email:</p>
                <p className="font-normal text-xl text-black">hello@thebox.com</p>
              </div>
            </div>

            {/* Right */}
            <div>
              <p className="font-medium text-xl text-primary mb-[43px]">
                Newsletter:
              </p>
              <div className="flex gap-0 mb-[83px]">
                <input
                  type="email"
                  placeholder="Your email here"
                  className="flex-1 bg-white border border-neutral-100 rounded-l px-2 py-2.5 text-lg text-neutral-300"
                />
                <Button variant="secondary" className="rounded-l-none">
                  Subscribe
                </Button>
              </div>

              <p className="font-medium text-xl text-primary mb-5">Social:</p>
              <div className="flex gap-5">
                <Image
                  src="/assets/b397103fac4d9f6baa9f8a39671c48f6b7559ef0.svg"
                  alt="Facebook"
                  width={40}
                  height={40}
                />
                <Image
                  src="/assets/b43c10fdeafde04bf0e705eacc6ffff13baf47b2.svg"
                  alt="LinkedIn"
                  width={40}
                  height={40}
                />
                <Image
                  src="/assets/66a534a021d08a5a6e3cc4ee47cd702da15e501b.svg"
                  alt="Twitter"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>

          {/* Logo at bottom */}
          <div className="flex items-center gap-3 mt-[80px] relative">
            {/* Random Symboles decoration */}
            <div className="absolute w-12 h-12 pointer-events-none">
              <Image src="/assets/41a98b88102502d3c6cec122fddef099043efe8a.svg" alt="" width={19} height={11} className="absolute top-[33px] left-[12px]" />
              <Image src="/assets/61cb0ed8ecf2cf84821a6eb9cd5e2051c34fc39c.svg" alt="" width={18} height={8} className="absolute top-[13px] left-[12px]" />
              <Image src="/assets/340dd3ac461322f02a6971897207ec64200d0647.svg" alt="" width={7} height={15} className="absolute top-[28px] left-[9px]" />
              <Image src="/assets/caa924e875e75de0bd57cb7e4978822d99abab1d.svg" alt="" width={19} height={22} className="absolute top-[22px] left-[12px]" />
              <Image src="/assets/5b210e843b3a7890bbb5c0f80ddb50eee79df84d.svg" alt="" width={18} height={16} className="absolute top-[13px] left-[8px]" />
              <Image src="/assets/a2cfc15aa3275c054b181dbf7aa54cd05376dadc.svg" alt="" width={19} height={35} className="absolute top-[22px] left-[6px]" />
            </div>
            <div className="w-12 h-12 relative">
              <Image
                src="/assets/762a4f982c7e562c3187091f9952d7ed888f2920.svg"
                alt="Logo"
                width={48}
                height={48}
              />
            </div>
            <p className="font-bold italic text-[30px] text-primary leading-none">
              The<span className="not-italic">Box</span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary h-[70px]">
        <div className="max-w-[1440px] mx-auto px-28 h-full flex items-center">
          <p className="text-white text-base">
            TheBox Company © 2022. All Rights Reserved
          </p>
        </div>
      </footer>
    </main>
  );
}
