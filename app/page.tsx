// Import necessary components and styles
import MainLayout from './main.layout';

const Home = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 ">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">ความรู้เกี่ยวกับดินเค็ม</h1>

        <div className="flex flex-col md:flex-row items-center md:justify-between space-y-6 md:space-y-0 md:space-x-8 p-6 bg-white rounded-lg shadow-md">
          <div className="w-full md:w-1/2">
            <img src="https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4VWinsu8RIoMbjRkVv969okGd026lEZFWVM2jjfGQqqYAxuchoz.jpg" alt="Saline Soil" className="rounded-lg shadow-md w-full" />
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-lg mb-4 leading-relaxed">
              <span className='text-2xl font-bold'>ดินเค็ม</span> คือปัญหาที่พบได้ในพื้นที่ที่มีปัจจัยการระบายน้ำและการใช้น้ำไม่เหมาะสม ส่งผลให้มีความเค็มสูงขึ้นซึ่งอาจส่งผลกระทบต่อการเพาะปลูกพืชและการใช้ประโยชน์จากพื้นที่ดินได้มาก
            </p>
            <p className="text-lg mb-4 leading-relaxed">
              การจัดการดินเค็ม เช่น การใช้การชลประทานแบบพิเศษ การใช้สารลดความเค็มในดิน และการเพิ่มปริมาณน้ำในดิน เป็นวิธีที่ช่วยลดปัญหานี้ได้
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">สาเหตุและผลกระทบ</h2>
            <p className="text-lg mb-6 leading-relaxed">
              สาเหตุหลักของการเกิดดินเค็มคือ ปัจจัยทางธรรมชาติที่ทำให้มีความเค็มสูงขึ้น เช่น น้ำฝนน้อยลง การระบายน้ำไม่เพียงพอ และการใช้น้ำในการเพาะปลูกอย่างไม่มีวิธี
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              ผลกระทบที่เกิดขึ้น เช่น การลดผลผลิตของพืช และคุณภาพของพืชที่เสื่อมเสียลง การสูญเสียทรัพยากรทางดิน และเสียหายทางเศรษฐกิจ
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">กลยุทธ์ในการจัดการ</h2>
            <p className="text-lg mb-6 leading-relaxed">
              การจัดการดินเค็มมีหลายวิธี เช่น การใช้การชลประทานแบบพิเศษ เพื่อควบคุมน้ำในดินให้มีความชื้นเพียงพอ การใช้สารลดความเค็มในดิน เพื่อลดระดับความเค็ม
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              การเพิ่มปริมาณน้ำในดิน โดยการใช้วิธีการเกษตรที่สามารถรักษาความชื้นในดินได้ เป็นต้น
            </p>
          </div>
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg shadow-md w-full flex flex-col justify-center items-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">ข้อมูลเพิ่มเติม</h2>
          <p className="text-lg leading-relaxed">
            สามารถเรียนรู้เพิ่มเติมเกี่ยวกับการจัดการดินเค็มได้จากภาคสื่อมวลชน หรือองค์กรที่เกี่ยวข้อง
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
