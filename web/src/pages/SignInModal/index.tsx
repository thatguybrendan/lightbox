import { useForm, SubmitHandler } from "react-hook-form";

import "./signInModal.css";

import { useSignIn } from "../../hooks/useSignIn";

type Inputs = {
  email: string;
  password: string;
};

const SignInModal = () => {
  const handleSignIn = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => handleSignIn.mutate(data);

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

      <div id="signin-modal" className="modal-window">
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
