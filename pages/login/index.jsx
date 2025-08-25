import Layout from "@/components/Layout";
import logo from "../../public/logo/LogoSarmayek.png";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { FiAlertCircle } from "react-icons/fi"; // آیکون هشدار

const Login = () => {
    const [mobile, setMobile] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        const phoneRegex = /^09\d{9}$/;
        if (!phoneRegex.test(mobile)) {
            setError("شماره باید ۱۱ رقم باشد و با 09 شروع شود.");
            return;
        }

        setError("");
        router.push({
            pathname: "/verify",
            query: { mobile }
        });
    };

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">

                {/* لوگو وسط چین */}
                <div className="mb-8">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={150}
                        height={50}
                        className="object-contain mx-auto"
                        priority
                    />
                </div>

                <h2 className="w-full max-w-sm text-right text-xl font-bold text-gray-800">
                    ورود | ثبت‌نام
                </h2>
                <p className="w-full max-w-sm text-right mt-2 text-sm text-gray-600">
                    سلام! لطفاً شماره موبایل خود را وارد کنید
                </p>

                <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm">
                    <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="شماره همراه"
                        className={`w-full border rounded-xl px-4 py-3 text-right shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${error ? "border-red-400 focus:ring-red-500" : "border-gray-300 focus:ring-blue-800"
                            }`}
                        dir="rtl"
                        inputMode="numeric"
                    />
                    {error && (
                        <div className="mt-2 flex items-center justify-center text-red-600 text-sm font-medium">
                            <FiAlertCircle className="w-4 h-4 ml-1" />
                            <span>{error}</span>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-800 text-white py-3 rounded-xl font-medium shadow hover:bg-blue-900 transition"
                    >
                        دریافت کد
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Login;


