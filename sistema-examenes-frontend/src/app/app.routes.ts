import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Signup } from './pages/signup/signup';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { UserDashboard } from './pages/user/user-dashboard/user-dashboard';
import { NormalGuard } from './services/normal-guard';
import { Profile } from './pages/profile/profile';
import { Welcome } from './pages/admin/welcome/welcome';
import { AdminGuard } from './services/admin-guard';
import { CategoryService } from './services/category';
import { ViewCategories } from './pages/admin/view-categories/view-categories';
import { AddCategory } from './pages/admin/add-category/add-category';
import { ViewExams } from './pages/admin/view-exams/view-exams';
import { AddExam } from './pages/admin/add-exam/add-exam';
import { UpdateExam } from './pages/admin/update-exam/update-exam';
import { ViewExamQuestions } from './pages/admin/view-exam-questions/view-exam-questions';
import { AddQuestion } from './pages/admin/add-question/add-question';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        pathMatch: 'full'
    },
    {
        path: 'signup',
        component: Signup,
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login,
        pathMatch: 'full'
    },
    {
        path: 'admin',
        component: Dashboard,
        canActivate: [AdminGuard],
        children: [
            {
                path: 'profile',
                component: Profile,
                pathMatch: 'full'
            },
            {
                path: '',
                component: Welcome,
                pathMatch: 'full'
            },
            {
                path:'ViewCategories',
                component:ViewCategories,
                pathMatch: 'full'
            },
            {
                path:'AddCategory',
                component:AddCategory,
                pathMatch: 'full'
            },
            {
                path:'ViewExams',
                component:ViewExams,
                
            },
            {
                path:'add-exam',
                component:AddExam,
                pathMatch: 'full'
            },
            {
                path:'exam/:examId',
                component:UpdateExam,
                pathMatch: 'full'
            },
            {
                path:'questions/:examId/:title',
                component:ViewExamQuestions,
                pathMatch: 'full'
            },
            {
                path:'add-question/:examId/:title',
                component:AddQuestion,
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'user-dashboard',
        component: UserDashboard,
        pathMatch: 'full',
        canActivate: [NormalGuard]
    }
];
