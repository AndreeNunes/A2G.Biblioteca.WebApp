export default {
    getterUsers: (state) => state?.users ?? -1,
    getterUsersFilter: (state) => state?.usersFilter ?? -1,
    getterUsersFilterRent: (state) => state?.usersFilter?.filter(item => !item.admin) ?? -1,
}       