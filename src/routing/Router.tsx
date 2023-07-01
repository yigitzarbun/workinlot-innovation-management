import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import paths from "./Paths";
import MainLayout from "../components/layout/MainLayout";
import PageLoading from "../components/loading/PageLoading";

const Home = lazy(() => import("../modules/home/Home"));
const Login = lazy(() => import("../modules/login/Login"));
const Signup = lazy(() => import("../modules/signup/Signup"));
const NotFound = lazy(() => import("../modules/not-found/NotFound"));
const Step1Form = lazy(() => import("../modules/step-1/form/Step1"));
const Step1Outcome = lazy(() => import("../modules/step-1/outcome/Outcome"));
const Step1Outro = lazy(() => import("../modules/step-1/outro/Outro"));
const Step2Intro = lazy(() => import("../modules/step-2/intro/Step2"));
const Step2Form = lazy(() => import("../modules/step-2/form/Step2Form"));

interface Routes {
  path: string;
  element: React.ReactNode;
}

const getRouteElement = (Component: React.ElementType): React.ReactNode => (
  <MainLayout>
    <Suspense fallback={<PageLoading />}>
      <Component />
    </Suspense>
  </MainLayout>
);

const routes: Routes[] = [
  { path: paths.HOME, element: getRouteElement(Home) },
  { path: paths.LOGIN, element: getRouteElement(Login) },
  { path: paths.SIGNUP, element: getRouteElement(Signup) },
  { path: paths.STEP_1, element: getRouteElement(Step1Form) },
  { path: paths.STEP_1_OUTCOME, element: getRouteElement(Step1Outcome) },
  { path: paths.STEP_1_OUTRO, element: getRouteElement(Step1Outro) },
  { path: paths.STEP_2_INTRO, element: getRouteElement(Step2Intro) },
  { path: paths.STEP_2_FORM, element: getRouteElement(Step2Form) },
  { path: paths.NOT_FOUND, element: getRouteElement(NotFound) },
];

export default createBrowserRouter(routes);
