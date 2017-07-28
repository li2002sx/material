// 懒加载
const Login = r => require.ensure([], () => r(require('../frames/Login')), 'Login')
const LaborIndex = r => require.ensure([], () => r(require('../frames/Index')), 'LaborIndex')
const CompanyDetail = r => require.ensure([], () => r(require('../frames/company/Detail')), 'CompanyDetail')
const CompanyProject = r => require.ensure([], () => r(require('../frames/company/Project')), 'CompanyProject')
const CompanyTeam = r => require.ensure([], () => r(require('../frames/company/Team')), 'CompanyTeam')
const CompanyInfo = r => require.ensure([], () => r(require('../frames/company/Info')), 'CompanyInfo')

const SceneIndex = r => require.ensure([], () => r(require('../frames/scene/Index')), 'SceneIndex')
const SceneTask = r => require.ensure([], () => r(require('../frames/scene/Task')), 'SceneTask')
const ScenePhoto = r => require.ensure([], () => r(require('../frames/scene/Photo')), 'ScenePhoto')
const SceneReport = r => require.ensure([], () => r(require('../frames/scene/Report')), 'SceneReport')
const SceneComplaint = r => require.ensure([], () => r(require('../frames/scene/Complaint')), 'SceneComplaint')

// const LoginMobile = r => require.ensure([], () => r(require('../frames/user/Login-Mobile')), 'login')
const StatIndex = r => require.ensure([], () => r(require('../frames/stat/Index')), 'StatIndex')
const StatProject = r => require.ensure([], () => r(require('../frames/stat/Project')), 'StatProject')
const StatWorker = r => require.ensure([], () => r(require('../frames/stat/Worker')), 'StatWorker')
const StatStaff = r => require.ensure([], () => r(require('../frames/stat/staff')), 'StatStaff')

export default [{
  path: '',
  redirect: '/login'
}, {
  path: '/login',
  component: Login
}, {
  path: '/index',
  component: LaborIndex,
  children: [{
    path: '/company/:id',
    component: CompanyDetail,
    children: [{
      path: '/company/project/:id/:name',
      component: CompanyProject,
      children: [{
        path: '/company/team/:projectId/:teamId/:teamName',
        component: CompanyTeam,
        children: [{
          path: '/company/info/:cardno',
          component: CompanyInfo
        }]
      }]
    }]
  }]
}, {
  path: '/scene/index',
  component: SceneIndex,
  children: [{
    path: '/scene/task',
    component: SceneTask
  }, {
    path: '/scene/photo',
    component: ScenePhoto
  }, {
    path: '/scene/report',
    component: SceneReport
  }, {
    path: '/scene/complaint',
    component: SceneComplaint
  }]
}, {
  path: '/stat/index',
  component: StatIndex,
  children: [{
    path: '/stat/project',
    component: StatProject
  }, {
    path: '/stat/worker',
    component: StatWorker
  }, {
    path: '/stat/staff',
    component: StatStaff
  }]
}]
