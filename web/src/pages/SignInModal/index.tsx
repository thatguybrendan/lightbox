import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import "./signInModal.css";

import { useSignIn } from "../../hooks/useSignIn";
import { useGetSelf } from "../../hooks/useGetSelf";
import { UnauthorizedError } from "../../types/httpErrors";
type Inputs = {
  email: string;
  password: string;
};

const SignInModal = () => {
  const [visible, setVisible] = useState(false);
  const handleSignIn = useSignIn();
  const { error } = useGetSelf();
  console.log(error);
  if (error instanceof UnauthorizedError && !visible) {
    setVisible(true);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleSignIn.mutate(data, {
      onSuccess: () => {
        console.log("success");
      },
      onError: () => {
        console.log("error");
      },
    });
  };

  /**
   * To activate the modal, make the target in the url #signin-modal.
    To close, remove this from the target. 
  */
  return (
    <>
      <div className="container">
        <div className="interior">
          {/* 
          //Eventually, this should be a sign in button.
          <a className="btn" href="#open-modal">
            👋 Basic CSS-Only Modal
          </a> 
          */}
        </div>
      </div>

      <div
        id="signin-modal"
        className={visible ? "modal-window visible" : "modal-window"}
      >
        <div>
          <h1>Voilà!</h1>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                defaultValue="test@test.com"
                {...register("email", { required: true })}
              />

              {errors.email && <span>This field is required</span>}

              <input {...register("password", { required: true })} />
              {/* errors will return when field validation fails  */}
              {errors.password && <span>This field is required</span>}

              <input type="submit" />
            </form>
            )
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default SignInModal;
