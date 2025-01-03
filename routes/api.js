import { Router } from "express";
//import { getAllUsers,getUserById } from "../controllers/user.controller.js";
import { createProject,getProjects,deleteProject,updateProject, getProjectById,getAllTasksByProjectId,getAllProjects } from "../controllers/project.controller.js";
import { createTask,getTaskById,getTasks,updateTask,deleteTask , getAllTasksByUserId,getAllTasks} from "../controllers/tasks.controller.js";
import { createDepartment,getAllDepartments } from "../controllers/department.controller.js";
import { createPath,updatePath,getPathById} from "../controllers/totalPath.controller.js";
//import { createMessage,deleteMessage,getMessageById,getMessagesByDiscussion } from "../controllers/message.controller.js";
//import { createDiscussion,getDiscussions,addMessage } from "../controllers/discussion.controller";
import { authorizeRoles } from "../middlewares/auth.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createResource,assignResourceToProject,getResourceById,getResourcesByProjectId,getAllResources,deleteResourceById} from "../controllers/resources.controller.js";
import { uploadProjectReport,getReportByProjectId,uploadTaskReport ,updateProjectReport,updateTaskReport,getReportByTaskId} from "../controllers/report.controller.js";
import { createProjectMLModel, getProjectMLModelById, updateProjectMLModelById } from '../controllers/projectml.controller.js';
import { createSeminar , getAllSeminars} from "../controllers/training.controller.js";
import { createNewPath,getNewPath,getAllNewPaths } from "../controllers/newPath.controller.js";
import { createCompletedPath,getCompletedPathById,updateCompletedPath } from "../controllers/completedPath.controller.js";
import multer from "multer";


const router=Router();


// router.route('/assignProjectToUser').post(
//     authorizeRoles('Main Admin','Project Admin'),
//     assignProjectToUser
// )

// router.route('/users').get(
//    // authorizeRoles('Main Admin'),
//     getAllUsers
// )

// router.route('/getUserById').get(
//     authorizeRoles('Main Admin'),
//     getUserById
// )


router.route("/project").post(
    createProject
)


// router.route('/getProject').get(
//     getProjects
// )


router.route('/getprojectbyid/:id').get(
    getProjectById
)

router.route('/getpathbyid/:id').get(
    getPathById
)


router.route('/deleteprojectbyid').delete(
    deleteProject
)


router.route('/updateproject/:projectId').patch(
    updateProject
)


router.route('/project/task').post(
    createTask
)


router.route('/project/getTaskById/:taskId').get(
    getTaskById
)


router.route('/createDepartment').post(
    createDepartment
)


router.route('/getalldep').get(
    getAllDepartments
)


router.route('/project/:projectId/tasks').get(
    getAllTasksByProjectId
)


router.route('/project/task/:taskId').patch(
    updateTask
)


router.route('/getalltasksbyuserid/:userId').get(
    getAllTasksByUserId
)


router.route('/getallprojects').get(
    getAllProjects
)


// router.route('/project/task').post(
//     authorizeRoles('Project Admin'),
//     createTask
// )


router.route('/path').post(
    createPath
)

router.route('/path/:id').patch(
    updatePath
)



router.route('/resource').post(
    createResource
)


router.route('/resource/assign').post(
    assignResourceToProject
)


router.route('/resource/:resourceId').get(
    getResourceById
)


router.route('/project/:projectId/resources').get(
    getResourcesByProjectId
)

router.route('/getallresources').get(
    getAllResources
)

router.route('/getalltasks').get(
    getAllTasks
)

const upload = multer({ dest: 'uploads/' });

router.route('/uploadProjectReport/:projectId').post(
    upload.array('report',10),
    uploadProjectReport
);


router.route('/uploadtaskreport/:taskId').post(
    upload.array('report',10),
    uploadTaskReport
);


router.route('/getReportByProjectId/:projectId').get(
    getReportByProjectId
);


router.route('/updateprojectreport/:projectId').patch( 
    upload.array('report',10), updateProjectReport
);


router.route('/updatetaskreport/:taskId').patch(
    upload.array('report',10),updateTaskReport
);


router.route('/getreportbytaskid/:taskId').get(
       getReportByTaskId
)


router.post('/projectMLModel', createProjectMLModel);
router.get('/projectMLModel/:id', getProjectMLModelById);
router.patch('/projectMLModel/:id', updateProjectMLModelById);


router.route('/createseminar').post(
    createSeminar
)


router.route('/getallseminars').get(
    getAllSeminars
)


router.route('deleteresource/:id').delete(
    deleteResourceById
)


router.route('/newpath').post(
    createNewPath
)
router.route('/getnewpath/:id').get(
    getNewPath
)

router.route('/getallnewpaths').get(
    getAllNewPaths
)

router.route('/createpath').post(
    createPath
)

router.route('/createcompletedpath').post(
    createCompletedPath
)

router.route('/getcompletedpathbyid/:id').get(
    getCompletedPathById
)

router.route('/updatecompletepath/:id').patch(
    updateCompletedPath
)

router.route('/updatetotalpath/:id').patch(
    updatePath
)

export default router



