export const HOST = 'https://staging-deep.envirowasteadmin.com.au/'
// export const HOST = 'https://deep.envirowasteadmin.com.au/'

const API_VERSION = 'api/v1/'
const BASE = HOST + API_VERSION

export const AUTHENTICATION = HOST + 'api/token/'
///profile///
export const PROFILE = BASE + 'team/profile/'
export const EDIT_PROFILE=BASE+ 'accounts/profile/view/'

export const BASE_IMAGE_URL = "https://deep.envirowasteadmin.com.au"
export const PROFILE_PERMISSION = BASE + 'accounts/access/permission/'
export const FIREBASE_TOKEN=BASE+'accounts/push-notification/key/'

///////Team///////////

export const TEAM_LIST = BASE + 'team/employee/all/'
export const TEAM_ADD = BASE + 'team/create/'
export const TEAM_EDIT = BASE + 'team/employee/edit/'
export const TEAM_DELETE = BASE + 'team/employee/delete/'
export const TEAM_DESIGNATION = BASE + 'team/designations/'
export const TEAM_SEARCH = BASE + 'team/searchEmployee/'
export const TEAM_ALL_FOLDERS_LIST = BASE + 'drive/team/master/folder/'

export const TEAM_FOLDER_DETAILS = BASE + 'team/folder/list/'
export const TEAM_FOLDER_SEARCH = BASE + 'team/folder/search/'
export const TEAM_CERTIFICATE = BASE + 'team/folder/'
export const TEAM_FOLDER_ADD_FILE = BASE + 'team/files/'

export const TEAM_CURRENT_LIST = BASE + 'team/status/current/'
export const TEAM_TERMINATED_LIST = BASE + 'team/status/terminated/'
export const FILES_FOLDERS_SEARCH=BASE+'drive/search/folder/ '
export const FILES_FILE_SEARCH=BASE+'drive/search/file/ '

export const TEAM_ALL_FOLDERS_LIST1=BASE+'drive/team/folder/'
export const TEAM_ALL_FOLDERS_LIST_SITE=BASE+'drive/site/folder/'

///////Client///////////


export const CLIENT_GET = BASE + 'clients/all/'
export const CLIENT_ADD = BASE + 'clients/create/'
export const CLIENT_EDIT = BASE + 'clients/edit/'
export const CLIENT_DELETE = BASE + 'clients/delete/'
export const CLIENT_SEARCH = BASE + 'clients/searchClient/all/'
export const CLIENT_PREVIOUS_SALES = BASE + 'jobs/previous/sale/'
export const TEMP_CLIENT_LIST=BASE +'clients/temporary-client/list/'


export const CLIENT_ASSET_CRUD=BASE+'clients/detail/crud/'

///////Vehicle///////////

export const VEHICLE_GET = BASE + 'vehicles/all/' 
export const VEHICLE_ALL_GET = BASE + 'vehicles/vehicle/id/' 
export const VEHICLE_ADD = BASE + 'vehicles/create/'
export const VEHICLE_EDIT = BASE + 'vehicles/edit/'
export const VEHICLE_DELETE = BASE + 'vehicles/delete/'
export const VEHICLE_SEARCH = BASE + 'vehicles/search/'

export const VEHICLE_TRUCK_MAINTANACE_GET = BASE + 'vehicles/maintenance/reports/'    
export const VEHICLE_TRUCK_MAINTANACE_SEARCH = BASE + 'vehicles/maintenace/reports/truck/search/'   
export const VEHICLE_TRUCK_MAINTANACE_EDIT = BASE + 'vehicles/maintenance/report/truck/edit/' 
export const VEHICLE_CAR_MAINTANACE_EDIT = BASE + 'vehicles/maintenance/report/car/edit/'   

export const VEHICLE_TRUCK_MAINTANACE_DELETE = BASE + 'vehicles/maintenance/report/truck/delete/' 
export const VEHICLE_TRUCK_MAINTANACE_ADD = BASE + 'vehicles/maintenance/report/truck/create/'
export const VEHICLE_CAR_MAINTANACE_ADD = BASE + 'vehicles/maintenance/report/car/create/'
export const VEHICLE_TRUCK_FUEL_GET = BASE + 'vehicles/getFuelExpenses/' 
export const VEHICLE_TRUCK_FUEL_EDIT = BASE + 'vehicles/editFuelExpense/' 
export const VEHICLE_TRUCK_FUEL_DELETE = BASE + 'vehicles/deleteFuelExpense/'  
export const VEHICLE_TRUCK_FUEL_ADD = BASE + 'vehicles/addFuelExpense/'
export const VEHICLE_TRUCK_PREINSPECTION = BASE + 'vehicles/pre-inspection/'

export const VEHICLE_FORKLIFT_MAINTANACE_GET = BASE + 'vehicles/forklift/maintenance/reports/' // append page no
export const VEHICLE_FORKLIFT_MAINTANACE_SEARCH = BASE + 'vehicles/forklift/maintenance-reports/search/' // append page no
export const VEHICLE_FORKLIFT_MAINTANACE_EDIT = BASE + 'vehicles/forklift/maintenance/edit/'
export const VEHICLE_FORKLIFT_MAINTANACE_DELETE = BASE + 'vehicles/forklift/maintanace/report/delete/'
export const VEHICLE_FORKLIFT_MAINTANACE_ADD = BASE + 'vehicles/forklift/maintenance/report/create/'



///////////Sales////////////////////

export const SALES_WASTE_GENERATE_QUOTE = BASE + 'sales/folders/generate_quote/'
export const SALES_WASTE_TEMPLATE_LIST = BASE + 'pro-pdf/templates/'
export const SALES_WASTE_ATTACH_FILE = BASE + 'sales/quote/attach/templates/'
export const SALES_WASTE_JOB_LIST = BASE + 'sales/jobs/'
export const SALES_WASTE_SALES_PERFORMANCE_LIST = BASE + 'sales/performance/'
export const SALES_WASTE_QUOTE_LIST = BASE + 'sales/quote/'
export const SALES_WASTE_SALES_PERFORMANCE_DETAIL = BASE + 'sales/manager/'
export const SALES_WASTE_JOB_PERFORMANCE_DETAIL = BASE + 'sales/client/quote/'
export const SALES_TEMP_CLIENTS = BASE + 'clients/temporary-client/list/'
export const SALES_CREATE_TEMPORARY_CLIENT = BASE + 'clients/temporary-client/'
export const SALES_QUOTE_GENERATE = BASE + 'sales/quote/'
export const SALES_QUOTE_ACTION             = BASE + 'sales/status/'


export const SALES_PUMP_JOBS = BASE + 'sales/'
export const SALES_PUMP_QUOTE_REGISTER = BASE + 'sales/'
export const SALER_PUMP_SALE_PERFORMANCE = BASE + 'sales/'
export const SALES_PUMP_QUOTE_GENERATE = BASE + 'sales/pumps/quote/'


export const SALES_QUOTE_ATTACH_TEMPLATE  =BASE+'sales/quote/attach/templates/'
export const SALES_GENERATE_TEMPLATE_DRAFT = BASE + 'sales/user/template/draft/'
export const SALES_GENERATE_SINGLE_TEMPLATE= BASE + 'sales/single/template/'
export const SALES_ALL_DRAFTS = BASE + 'sales/template/draft/all/'
export const SALES_CLIENT_QUOTE_TEMPLATE=BASE+'sales/single/template/draft/'
export const SALES_GENERATE_SINGLE_TEMPLATES= BASE + 'sales/single/template/draft/'
export const SALES_JOB_TYPEOSWASTE = BASE + 'sales/waste/type/'
export const SALES_CLIENT_SERACH = BASE + 'sales/quote/client/search/'

export const SALES_JOB_CARD = BASE + 'jobs/card/info/view/'
export const SALES_REVIEW = BASE + 'sales/quote/sales-team/'

export const SALES_JOB_CARD_LIST=BASE+'jobs/card/info/view/'

export const SALES_JOB_CARD_CREATE=BASE+'jobs/card/info/create/'

export const SALES_JOB_CARD_BY_CLIENT=BASE+'jobs/card/info/view/client_id/'

export const SALES_JOB_CARD_EDIT=BASE+"jobs/card/info/edit/"



////Intranet//////////

export const INTRANET_FOLDERS_FILES = BASE + 'intranet_archive/folder/view/'
export const INTRANET_INNER_FOLDERS = BASE + 'intranet_archive/home/file-attachment/'
export const INTRANET_FOLDERS=BASE+'intranet_archive/folder/segment/'
export const INTRANET_FOLDERS_SEARCH = BASE + 'drive/search/folder/'


////Schedule////////

export const SCHEDULE_LIST_WASTE = BASE + 'schedule/view/mobile/'
export const SCHEDULE_STATUS_CHANGE = BASE + 'schedule/jobschedule/edit/'
export const SCHEDULE_JOB_CARD = BASE + 'jobs/custom/card/'

export const SCHEDULE_IMAGE_ADD = BASE + 'schedule/jobschedule/images/add/'
export const SCHEDULE_SIGNATURE_ADD = BASE + 'schedule/jobschedule/signature/add/'
export const SCHEDULE_COMMENT_VIEW = BASE + 'schedule/jobschedule/comments/'


///OHS/////

export const OHS_NEWS_LIST = BASE + 'oh_and_s/news/view/'
export const OHS_NOTIFY_LIST = BASE + 'oh_and_s/notification/view/'
export const OHS_NEWS_CREATE = BASE + 'oh_and_s/news/create/'
export const OHS_NOTIFY_CREATE = BASE + 'oh_and_s/notification/create/'
export const OHS_NEWS_DELETE = BASE + 'oh_and_s/news/delete/'
export const OHS_NOTIFY_DELETE = BASE + 'oh_and_s/notification/delete/'
export const OHS_NEWS_EDIT = BASE + 'oh_and_s/news/edit/'
export const OHS_NEWS_READ = BASE + 'oh_and_s/news/status/'
export const OHS_NOTIFICATION_READ = BASE + 'oh_and_s/notification/status/'
export const OHS_AND_S_FOLDERS = BASE + 'intranet_archive/folder/segment/'
