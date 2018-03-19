// 懒加载
const Index = r => require.ensure([], () => r(require('../frames/Index.vue')), 'Index')

const UserIndex = r => require.ensure([], () => r(require('../frames/user/Index.vue')), 'UserIndex')
const Login = r => require.ensure([], () => r(require('../frames/user/Login.vue')), 'Login')
const FindPass = r => require.ensure([], () => r(require('../frames/user/FindPass.vue')), 'FindPass')
const Feedback = r => require.ensure([], () => r(require('../frames/user/Feedback.vue')), 'Feedback')
const AboutUs = r => require.ensure([], () => r(require('../frames/user/AboutUs.vue')), 'AboutUs')

const WorkIndex = r => require.ensure([], () => r(require('../frames/work/Index.vue')), 'WorkIndex')
const MyApply = r => require.ensure([], () => r(require('../frames/work/MyApply.vue')), 'MyApply')
const TodoList = r => require.ensure([], () => r(require('../frames/work/TodoList.vue')), 'TodoList')
// const WorkDetail = r => require.ensure([], () => r(require('../frames/work/Details.vue')), 'WorkDetail')

const InIndex = r => require.ensure([], () => r(require('../frames/instorage/Index.vue')), 'InIndex')
const InAdd = r => require.ensure([], () => r(require('../frames/instorage/Add.vue')), 'InAdd')
const InAddHalf = r => require.ensure([], () => r(require('../frames/instorage/AddHalf.vue')), 'InAddHalf')

const OutIndex = r => require.ensure([], () => r(require('../frames/outstorage/Index.vue')), 'OutIndex')
const OutAdd = r => require.ensure([], () => r(require('../frames/outstorage/Add.vue')), 'OutAdd')

const NoticeIndex = r => require.ensure([], () => r(require('../frames/notice/Index.vue')), 'NoticeIndex')
const NoticeDetail = r => require.ensure([], () => r(require('../frames/notice/Detail.vue')), 'NoticeDetail')

const ControlWorkDetail = r => require.ensure([], () => r(require('../frames/work/control/Details.vue')), 'ControlWorkDetail')
const InWorkDetail = r => require.ensure([], () => r(require('../frames/work/in/Details.vue')), 'InWorkDetail')
const OutWorkDetail = r => require.ensure([], () => r(require('../frames/work/out/Details.vue')), 'OutWorkDetail')
const NeedWorkDetail = r => require.ensure([], () => r(require('../frames/work/need/Details.vue')), 'NeedWorkDetail')
const ContractWorkDetail = r => require.ensure([], () => r(require('../frames/work/contract/Details.vue')), 'ContractWorkDetail')
const TargetWorkDetail = r => require.ensure([], () => r(require('../frames/work/target/Details.vue')), 'TargetWorkDetail')

export default [{
  path: '',
  redirect: '/login'
}, {
  path: '/index',
  component: Index
}, {
  path: '/login',
  component: Login
}, {
  path: '/user',
  component: UserIndex
}, {
  path: '/user/findpass',
  component: FindPass
}, {
  path: '/user/feedback',
  component: Feedback
}, {
  path: '/user/aboutus',
  component: AboutUs
}, {
  path: '/work',
  component: WorkIndex
}, {
  path: '/work/apply',
  component: MyApply
}, {
  path: '/work/todo',
  component: TodoList
}, {
  path: '/work/control/detail/:procId/:billId',
  component: ControlWorkDetail
}, {
  path: '/work/in/detail/:procId/:billId',
  component: InWorkDetail
}, {
  path: '/work/out/detail/:procId/:billId',
  component: OutWorkDetail
}, {
  path: '/work/need/detail/:procId/:billId',
  component: NeedWorkDetail
}, {
  path: '/work/contract/detail/:procId/:billId',
  component: ContractWorkDetail
}, {
  path: '/work/target/detail/:procId/:billId',
  component: TargetWorkDetail
}, {
  path: '/in',
  component: InIndex
}, {
  path: '/in/add',
  component: InAdd
}, {
  path: '/in/addhalf',
  component: InAddHalf
}, {
  path: '/out',
  component: OutIndex
}, {
  path: '/out/add',
  component: OutAdd
}, {
  path: '/notice',
  component: NoticeIndex
}, {
  path: '/notice/detail',
  component: NoticeDetail
}]
