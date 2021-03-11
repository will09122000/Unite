export default interface IPostData {
    postID: number
    userID: string
    title: string
    content: string
    picture: { type: string; data: number[] } | null
    studyGroup: string | null
    potentialScore: number | null
    timestamp: string
}
