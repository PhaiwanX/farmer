import MainLayout from "../main.layout";

export default function Tools() {
    return (
        <MainLayout>
            <div className="flex flex-col justify-center items-center py-5">

                <img src="image/t1.jpg" className="w-2/3 border rounded-lg my-2" />

                <div className="grid grid-cols-2 gap-4 w-2/3">
                    <div className="h-96">
                        <img src="/image/t3.jpg" alt="Image 1" className="object-cover h-full w-full border rounded-lg my-2"></img>
                        <center>ยิปซัมร่วมกับปุ๋ยคอกและปุ๋ยหมัก</center>
                    </div>
                    <div className="h-96">
                        <img src="/image/t2.jpg" alt="Image 2" className="object-cover h-full w-full border rounded-lg my-2"></img>
                        <center>ปุ๋ยหมัก</center>
                    </div>
                </div>
                <iframe
                className="w-2/3 border rounded-lg my-4"
                    width="1259"
                    height="708"
                    src="https://www.youtube.com/embed/sAMd9oNKRtM"
                    title="วิธีทำปุ๋ยหมักพืชสด ทำง่าย ใช้ดี ช่วยปรับปรุงดิน เพิ่มจุลินทรีย์และอินทรีย์วัตถุ"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
                <div className="my-4">
                    <span>งานวิจัยที่เกียวข้อง</span>
                    <ul>
                        <li>
                        <a target="_balnk" className="underline text-blue-500" href="http://www1.ldd.go.th/WEB_PSD/pdf/expert%20work/ex11/3.pdf">http://www1.ldd.go.th/WEB_PSD/pdf/expert%20work/ex11/3.pdf</a>
                        </li>
                        <li>
                        <a target="_balnk" className="underline text-blue-500" href="https://ag2.kku.ac.th/kaj/PDF.cfm?filename=P061%20Agr07.pdf&id=2772&keeptrack=3">https://ag2.kku.ac.th/kaj/PDF.cfm?filename=P061%20Agr07.pdf&id=2772&keeptrack=3</a>
                        </li>
                        <li>
                        <a target="_balnk" className="underline text-blue-500" href="https://www.kasetorganic.com/knowledge/saline-soil/">https://www.kasetorganic.com/knowledge/saline-soil/</a>
                        </li>
                    </ul>
                </div>
            </div>
        </MainLayout>
    );
}
