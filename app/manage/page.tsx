import MainLayout from "../main.layout";

export default function manage() {
    return (
        <MainLayout>
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-4 text-center">การจัดการพื้นที่ดินเค็ม</h1>
                
                <div className="flex flex-col items-center justify-center">
                    <div className="mb-8 w-full max-w-4xl">
                        <div className="relative" style={{ paddingTop: "56.25%" }}>
                            <iframe
                                src="https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=332868740925419&show_text=0&width=560"
                                width="100%"
                                height="100%"
                                style={{ position: "absolute", top: 0, left: 0, border: 'none' }}
                                scrolling="no"
                                frameBorder="0"
                                allow="encrypted-media"
                                allowFullScreen={true}
                                className="rounded-lg shadow-lg"
                            ></iframe>
                        </div>
                    </div>
                    <div className="mb-8 w-full ">
                        <div className="relative" style={{ paddingTop: "56.25%" }}>
                            <iframe
                                src="https://online.fliphtml5.com/bpvoy/frbp/"
                                width="100%"
                                height="100%"
                                style={{ position: "absolute", top: 0, left: 0, border: 'none' }}
                                scrolling="no"
                                frameBorder="0"
                                allow="encrypted-media"
                                allowFullScreen={true}
                                className="rounded-lg shadow-lg"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
