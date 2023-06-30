import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import paths from "./Paths";
import MainLayout from "../components/layout/MainLayout";
import PageLoading from "../components/loading/PageLoading";

const Home = lazy(() => import("../modules/home/Home"));
const Login = lazy(() => import("../modules/login/Login"));
const Signup = lazy(() => import("../modules/signup/Signup"));
const NotFound = lazy(() => import("../modules/not-found/NotFound"));
const Step1 = lazy(() => import("../modules/step-1/Step1"));

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
  { path: paths.STEP_1, element: getRouteElement(Step1) },
  { path: paths.NOT_FOUND, element: getRouteElement(NotFound) },
];

export default createBrowserRouter(routes);
