export default interface ICommentData {
    commentID: string
    userID: string
    postID: string
    content: string
    picture: { type: string; data: number[] } | null
    timestamp: string
}
