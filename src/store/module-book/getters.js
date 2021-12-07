export default {
    getterBooks: (state) => state?.book ?? -1,
    getterBooksFilter: (state) => state?.bookFilter ?? -1,
    getterGender: (state) => state?.genderFilter ?? -1,
    getterGenderFilter: (state) => state?.genderFilter ?? -1,
    getterEditor: (state) => state?.editorFilter ?? -1,
    getterEditorFilter: (state) => state?.editorFilter ?? -1,
    getterAuthor: (state) => state?.authorFilter ?? -1,
    getterAuthorFilter: (state) => state?.authorFilter ?? -1,
}       