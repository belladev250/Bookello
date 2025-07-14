import {createRouter ,createWebHistory} from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import PartnerDashboard from '@/views/PartnerDashboard.vue';
import AddListing from '@/views/AddListing.vue';
import GuestDashboard from '@/views/GuestDashboard.vue';
import RoleSelector from '@/components/RoleSelector.vue';
import BookService from '@/views/BookService.vue';


const routes =[

    {path:'/',name:'HomePage',component:HomePage},
    {path:'/login',name:'LoginPage',component:LoginPage},
    {path:'/register',name:'RegisterPage',component:RegisterPage},
    {path:'/dashboard/partner',name :'PartnerDashboard',component:PartnerDashboard },
    {path:'/dashboard/partner/add-service',name:'AddListing',component:AddListing },
    {path:'/dashboard/guest', name:'GuestDashboard',component:GuestDashboard },
    {path :'/role-selector', name:'RoleSelector', component:RoleSelector },
    {path: '/book/:id', name: 'BookService',component:BookService }

];

const router = createRouter({
    
    history :createWebHistory(),
    routes,
});


export default router;
