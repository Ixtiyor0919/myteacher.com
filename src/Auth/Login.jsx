import {
    Form,
    Input,
    Button,
    Checkbox,
    notification,
} from "antd";
import axios from "axios";
import "../../Styles/Login.css";
import { useEffect, useState } from "react";
import useToken from "../Hooks/UseToken";
import { useNavigate } from "react-router-dom";
import { FrownOutlined } from "@ant-design/icons";
import LoadingComp from "../Components/Loading/Loading1";

const Login = () => {
    const [loading, setLoading] = useState(true);
    const { token, setToken } = useToken();
    const navigate = useNavigate();
    const onFinish = (values) => {
        axios
            .post(
                "Link",
                {
                    fio: values.fio,
                    password: values.password,
                }
            )
            .then((data) => {
                setToken(data.data.data, values.remember);
                window.location.href = "/";
            })
            .catch((err) => {
                notification["error"]({
                    message: "Kirishda xatolik",
                    description:
                        "Ism sharifingizni yoki parolni noto'g'ri kiritdingiz.",
                    duration: 3,
                    icon: <FrownOutlined style={{ color: "#f00" }} />,
                });
                setLoading(false);
                console.error(err);
                navigate("/login");
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.error("Failed:", errorInfo);
    };

    const handleChange = () => {};

    useEffect(() => {
        if (token) {
            navigate("/");
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <LoadingComp />;
    }

    return (
        <div className="login">
            <div className="login-page">
                <div className="login-box">
                    <div className="illustration-wrapper">
                        <div style={{ marginBottom: "7%" }}>
                            <h1>Myteacher.com</h1>
                        </div>
                    </div>
                    <Form
                        name="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <p className="form-title">Xush kelibsiz</p>
                        <p>O'z sahifangizga kiring</p>
                        <Form.Item
                            name="fio"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Iltimos ism sharifingizmi kiriting",
                                },
                            ]}
                        >
                            <Input placeholder="Ism sharifingizmi kiriting" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Iltimos parolingizni kiritig",
                                },
                            ]}
                        >
                            <Input.Password placeholder="Parolingizni kiriting" />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Meni eslab qol</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                onClick={handleChange}
                            >
                                KIRISH
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
