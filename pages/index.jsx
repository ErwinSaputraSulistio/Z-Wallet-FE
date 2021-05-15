import styles from '../styles/LandingPage.module.css'
import Head from 'next/head'
import Carousel from 'react-elastic-carousel'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import CustomButton from '../components/diminutive/CustomButton'
// IMAGES
import Phone from '../img/OnePhone.png'
import PS from '../img/playStore.png'
import AS from '../img/appStore.png'
import OurPartner from '../img/ourPartner.png'
import First from '../img/firstCard.png'
import Second from '../img/secondCard.png'
import Third from '../img/thirdCard.png'

export default function LandingPage() {
   // BASE CONF
   const router = useRouter()
   useEffect(() => { localStorage.getItem("jwtToken") !== null && router.push("/home") })
   // CAROUSEL - DATA
   const carouselData = [
      {
         userImg: "https://user-images.githubusercontent.com/77045083/118376145-708d0280-b5f0-11eb-8484-41d507a80676.jpg",
         userName: "Larasati Ayudia",
         userJob: "Food Vlogger",
         userSay: 
         '"Lagi asik-asik nge-vlog makanan, tiba-tiba bill-nya dateng tapi lagi gak bawa cash, aduh gimana nih?' +
         ' Oiya baru inget, kan ada Z-Wallet! Tinggal nentuin siapa penerimanya terus masukin jumlah saldo sama PIN, langsung beres deh!' +
         ' Ini salah satu kisahku saat menggunakan aplikasi Z-Wallet, mana kisahmu?"'
      },
      {
         userImg: "https://user-images.githubusercontent.com/77045083/118376041-c3b28580-b5ef-11eb-9de8-7f58cc6e5098.png",
         userName: "Erwin Saputra Sulistio",
         userJob: "UI/UX & Frontend Engineer",
         userSay: 
         '"Z-Wallet sangat mempermudah saya dalam mengurus masalah transfer saldo, tanpa harus bertatap muka secara langsung.' +
         " Ini sungguh membantu saya yang merupakan seorang desainer UI/UX sekaligus programmer di bagian Frontend," + 
         " dalam mengurus sebagian besar klien-klien saya yang ingin melakukan pembayaran via transfer online." +
         ' Tak perlu repot-repot transfer saldo lewat ATM lagi, kini Z-Wallet sudah hadir sebagai salah satu kemudahan dan solusi baru dalam transaksi saldo secara virtual."'
      },
      {
         userImg: "https://user-images.githubusercontent.com/77045083/118376306-733c2780-b5f1-11eb-9ca6-4a570d67581b.jpg",
         userName: "Diana Paramitha Wijaya",
         userJob: "Doctor",
         userSay: 
         '"Z-Wallet sudah sejak lama menemani saya dalam menyelamatkan berbagai pasien, suka duka sudah kami alami bersama.' +
         ' Ada suatu cerita lama, dimana pasien saya ingin menggunakan jasa saya yang merupakan seorang dokter, ' +
         ' namun di karenakan ia tidak punya uang tunai maka segera saya sarankan untuk menggunakan Z-Wallet.' +
         ' Sekarang dia jadi bisa bayar langsung dan secepat mungkin konsultasi mengenai penyakitnya, ternyata ia adalah seorang pengidap gagal jantung akut.' +
         ' Coba bayangkan jika tidak ada Z-Wallet, mungkin ia sudah tidak tertolong dan kehilangan nyawanya karena terlambat untuk di obati!"'
      }
   ]
   // RETURN
   return (
      <div>
         <Head>
         <title>Z-Wallet | Welcome</title>
         <link rel="icon" href="/favicon.ico" />
         </Head>
         <div className="showInAnimation">
            {/* NAVBAR */}
            <div className={styles.navbar}>
               <span className={styles.zWalletText}>Z-Wallet</span>
               <div className={"displayRow " + styles.navBtnArea}>
                  <CustomButton btnCls={styles.navBtnLogin} func={ () => { router.push("/login") } } txClr="#6379F4" value="Login"/>
                  <CustomButton bgClr="#6379F4" btnCls={styles.navBtnSignUp} func={ () => { router.push("/register") } } txClr="white" value="Sign Up"/>
               </div>
            </div>
            {/* HEADER */}
            <div className={"displayRow " + styles.header}>
               <img className={styles.headerPhoneImg} src={Phone}/>
               <div className={"displayColumn " + styles.headerRightSide}>
                  <span className={styles.title}>Awesome App for Saving <span style={{color: "#6379F4"}}>Time</span></span>
                  <span className={styles.text}>We bring you a mobile app for banking problems that oftenly wasting much of your times.</span>
                  <CustomButton bgClr="#6379F4" btnCls={styles.tryItFree} func={ () => { router.push("/login") } } txClr="white" value="Try It Free"/>
                  <span className={styles.text}>Available on</span>
                  <div className={"displayRow " + styles.storeBtnArea} style={{alignItems: "center"}}>
                  <img className={styles.playStore} src={PS}/>
                  <img className={styles.appStore} src={AS}/>
                  </div>
               </div>
            </div>
            {/* OUR PARTNER */}
            <div className={styles.ourPartner}>
               <img className={styles.ourPartnerImg} src={OurPartner}/>
            </div>
            {/* ABOUT APPLICATION */}
            <div className={"displayColumn " + styles.aboutApplication} style={{alignItems: "center"}}>
               <span className={styles.title}><span style={{color: "#6379F4", fontWeight: "bold"}}>About</span> the Application.</span>
               <span className={styles.text}>
                  We have some great features from the application and it’s totally free to use by all users around the world.
               </span>
               <div className={styles.aboutApplicationCardZone}>
                  <div className={"displayColumn " + styles.aboutApplicationCard}>
                  <img className={styles.aboutApplicationCardLogo} src={First}/>
                  <span className={styles.aboutApplicationCardTitle}>24/7 Support</span>
                  <span className={styles.aboutApplicationCardText}>We have 24/7 contact support so you can contact us whenever you want and we will respond it.</span>
                  </div>
                  <div className={"displayColumn " + styles.aboutApplicationCard}>
                  <img className={styles.aboutApplicationCardLogo} src={Second}/>
                  <span className={styles.aboutApplicationCardTitle}>Data Privacy</span>
                  <span className={styles.aboutApplicationCardText}>We make sure your data is safe in our database and we will encrypt any data you submitted to us.</span>
                  </div>
                  <div className={"displayColumn " + styles.aboutApplicationCard}>
                  <img className={styles.aboutApplicationCardLogo} src={Third}/>
                  <span className={styles.aboutApplicationCardTitle}>Easy Download</span>
                  <span className={styles.aboutApplicationCardText}>Z-Wallet is 100% totally free to use it’s now available on Google Play Store and App Store.</span>
                  </div>
               </div>
            </div>
            {/* ALL FEATURES */}
            <div className={"displayRow " + styles.allFeatures} style={{justifyContent: "space-between"}}>
               <img className={styles.headerPhoneImg} src={Phone}/>
               <div className={"displayColumn " + styles.allFeaturesRightSide}>
               <span className={styles.title}>All the <span style={{color: "#6379F4"}}>Great</span></span>
               <span className={styles.title}>Z-Wallet Features.</span>
               <div className={styles.allFeaturesCardZone}>
                  <div className={"displayColumn " + styles.allFeaturesCard}>
                     <span className={styles.allFeaturesCardTitle} style={{fontWeight: "bold"}}><span style={{color: "#6379F4", marginRight: "1vw"}}>1.</span>Small Fee</span>
                     <span className={styles.allFeaturesCardText}>We only charge 5% of every success transaction done in Z-Wallet app.</span>
                  </div>
                  <div className={"displayColumn " + styles.allFeaturesCard}>
                     <span className={styles.allFeaturesCardTitle} style={{fontWeight: "bold"}}><span style={{color: "#6379F4", marginRight: "1vw"}}>2.</span>Data Secured</span>
                     <span className={styles.allFeaturesCardText}>All your data is secured properly in our system and it’s encrypted.</span>
                  </div>
                  <div className={"displayColumn " + styles.allFeaturesCard}>
                     <span className={styles.allFeaturesCardTitle} style={{fontWeight: "bold"}}><span style={{color: "#6379F4", marginRight: "1vw"}}>3.</span>User-Friendly</span>
                     <span className={styles.allFeaturesCardText}>Z-Wallet come up with modern and sleek design and not complicated.</span>
                  </div>
               </div>
               </div>
            </div>
            {/* CAROUSEL */}
            <div className={"displayColumn " + styles.carouselZone} style={{alignItems: "center"}}>
               <span className={styles.title}>What Users are <span style={{color: "#6379F4"}}>Saying.</span></span>
               <span className={styles.text}>We have some great features from the application and it’s totally free to use by all users around the world.</span>
               <Carousel>
                  {
                  carouselData.map((item) => {
                     return(
                        <div className={"displayColumn hoverThis " + styles.carouselCard} style={{alignItems: "center"}}>
                           <img className={styles.userImg} src={item.userImg}/>
                           <span className={styles.userName}>{item.userName}</span>
                           <span className={styles.userJob}>{item.userJob}</span>
                           <span className={styles.userSay}>{item.userSay}</span>
                        </div>
                     )
                  })
                  }
               </Carousel>
            </div>
            {/* FOOTER */}
            <div className={"displayColumn " + styles.footer} style={{background: "#6379F4"}}>
               <span className={styles.footerZWallet}>Z-Wallet</span>
               <span className={styles.footerText}>Simplify financial needs and saving much time in banking needs with one single app.</span>
               <div className={styles.footerBottom}>
                  <span>2020 Zwallet. All right reserved.</span>
                  <div className={styles.footerBottomRight}>
                     <span>+62 5637 8882 9901</span>
                     <span>ciwin@zwallet.com</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
