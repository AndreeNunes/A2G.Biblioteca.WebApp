export default {
    getterComments: (state) => state?.comments?.filter(item => item.reviewed) ?? -1,
    getterCommentsFilter: (state) => state?.commentsFilter?.filter(item => item.reviewed) ?? -1,
    getterCommentsNotReviewed: (state) => state?.comments?.filter(item => !item.reviewed) ?? -1,
    getterCommentsFilterNotReviewed: (state) => state?.commentsFilter?.filter(item => !item.reviewed) ?? -1,
}       