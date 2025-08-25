import Layout from "@/components/Layout";
import Image from "next/image";
import Logo from "../../public/logo/LogoSarmayek.png";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { FiEdit, FiRefreshCw } from "react-icons/fi";

const Verify = () => {
    const router = useRouter();
    const { mobile } = router.query;

    const [code, setCode] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(30);
    const inputsRef = useRef([]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleChange = (e, i) => {
        const val = e.target.value.replace(/[^0-9]/g, "");
        if (!val) return;

        const newCode = [...code];
        newCode[i] = val.slice(-1); 
        setCode(newCode);

        if (i < 3) inputsRef.current[i + 1].focus();
    };

    const handleKeyDown = (e, i) => {
        if (e.key === "Backspace" && !code[i] && i > 0) {
            const newCode = [...code];
            newCode[i - 1] = "";
            setCode(newCode);
            inputsRef.current[i - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`کد: ${code.join("")} برای شماره ${mobile}`);
    };

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
                
                <Image src={Logo} alt="Logo" width={150} height={50} className="mb-8 object-contain" priority />

                <h2 className="w-full max-w-sm text-right text-xl font-bold text-gray-800">تایید شماره موبایل</h2>
                <p className="w-full max-w-sm text-right mt-2 text-sm text-gray-600">
                    لطفاً کد ۴ رقمی ارسال شده به {mobile} را وارد کنید
                </p>

                <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm flex justify-between" dir="ltr">
                    {code.map((num, i) => (
                        <input
                            key={i}
                            type="text"
                            value={num}
                            maxLength={1}
                            inputMode="numeric"
                            onChange={(e) => handleChange(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            ref={(el) => (inputsRef.current[i] = el)}
                            className="w-12 h-12 border border-gray-300 rounded-xl shadow-sm text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                        />
                    ))}
                </form>

                <button
                    onClick={handleSubmit}
                    className="mt-6 w-full max-w-sm bg-blue-800 text-white py-3 rounded-xl font-medium shadow hover:bg-blue-900 transition"
                >
                    تایید
                </button>

                <div className="mt-4 flex items-center justify-center gap-6">
                    <button onClick={() => router.push("/login")} className="flex items-center text-sm text-blue-800 hover:underline">
                        <FiEdit className="ml-1" /> ویرایش شماره
                    </button>
                    {timer > 0 ? (
                        <span className="text-gray-500 text-sm">ارسال مجدد کد در {timer} ثانیه</span>
                    ) : (
                        <button onClick={() => setTimer(30)} className="flex items-center text-sm text-blue-800 hover:underline">
                            <FiRefreshCw className="ml-1" /> ارسال مجدد کد
                        </button>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Verify;
