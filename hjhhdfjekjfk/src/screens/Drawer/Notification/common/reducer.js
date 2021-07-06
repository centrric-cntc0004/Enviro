let initialState = {
    notification_list: [],
    notification_page: 1,
    pageNewsContent: true,
    pageNotifyContent: true,
    news_list: [],
    news_page: 1,
    isLoading: false,
    memberarray:undefined

}


const ohs = (state = initialState, actions) => {

    switch (actions.type) {
        case "OHS_NOTIFICATION_LIST":
            let notifyPgstatus = actions.notifications.length === 0
            return Object.assign({}, {
                ...state,
                notification_list: actions.notifications,
                notification_page: actions.page,
                pageNotifyContent: notifyPgstatus,
                isLoading: false
            })

        case "OHS_NEWS_LIST":
            let newsPgstatus = actions.news.length === 0
            return Object.assign({}, {
                ...state,
                news_list: actions.news,
                news_page: actions.page,
                pageNewsContent: newsPgstatus,
                isLoading: false
            })
        case "OHS_FETCHING":
            return {
                ...state,
                isLoading: true,
            }
            case "MEMBER_LIST":
                return {
                    ...state,
                    memberarray: actions.memberlist
    
                }
        case "UPDATE_PAGE":
            return Object.assign({},
                state)
        default:
            return state

    }
}

export default ohs