import styles from "@/styles/login/login.module.scss";
import Form from "../form/Form";
import FormInput from "../form/FormInput";
import {loginRequestSchema} from "@/schemas/login_request";
import {yupResolver} from "@hookform/resolvers/yup";
import {message} from "antd";
import {useUserLoginMutation} from "@/rtk/features/api/authApi";
import {useRouter} from "next/navigation";
import {storeUserInfo} from "@/services/auth.service";
import {IResponseSuccessUnwrap} from "@/types";

const Login = () => {
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    // console.log(data);

    message.loading("login.....");
    try {
      const res: IResponseSuccessUnwrap = await userLogin({...data}).unwrap();

      if (res?.data?.accessToken) {
        router.push("/store");
        message.success(res.message);
      }
      storeUserInfo({accessToken: res?.data?.accessToken});
      // console.log(res);
    } catch (err: any) {
      // console.error(err);
      message.error(err.message);
    }
  };

  const defaultValues = {
    store_id: "S-00002",
    password: "123456",
  };

  return (
    <section className={`${styles.section} section_padding`}>
      <div className={styles.sectionTitle}>
        <h2>Login</h2>
      </div>
      <div className={styles.formWraper}>
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(loginRequestSchema)}
          defaultValues={defaultValues}>
          <div className={styles.inputWraper}>
            <FormInput name="store_id" label="Store" />
          </div>
          <div className={styles.inputWraper}>
            <FormInput type="password" name="password" label="Password" />
          </div>

          <div className={styles.submit}>
            <button type="submit">Login</button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default Login;
