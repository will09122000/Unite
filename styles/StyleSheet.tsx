/**
 * @file App wide styling
 * @author PerhapsCow
 */

import { StyleSheet } from "react-native"
import { ThemeType } from "../contexts/themeContext"

// Dark theme (default)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#616160",
    },
    button: {
        width: 150,
        padding: 5,
        backgroundColor: "#183253",
        borderWidth: 2,
        borderColor: "#adadad",
        borderRadius: 10,
        alignSelf: "center",
        margin: "5%",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 20,
        color: "#f5f6fa",
        fontWeight: "bold",
        textAlign: "center",
    },
    inlineText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#f5f6fa",
        textAlign: "center",
        marginTop: "5%",
    },
    title: {
        textAlign: "center",
        fontSize: 40,
        margin: "5%",
        fontWeight: "bold",
        color: "#f5f6fa",
        marginTop: "15%",
    },
    subtitle: {
        textAlign: "center",
        fontSize: 22,
        margin: "5%",
        fontWeight: "bold",
        color: "#f5f6fa",
    },
    text: {
        textAlign: "left",
        fontSize: 20,
        marginTop: "5%",
        marginLeft: "15%",
        color: "#f5f6fa",
    },
    textInput: {
        width: "70%",
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#adadad",
        padding: 10,
        margin: 5,
        color: "#080808",
        borderRadius: 5,
        backgroundColor: "#d3d3d3",
        alignSelf: "center",
    },
    forgotPasswordText: {
        color: "#f5f6fa",
        textAlign: "left",
        margin: 5,
        paddingLeft: "15%",
        textDecorationLine: "underline",
    },
    errorText: {
        color: "#ff0033",
        textAlign: "left",
        margin: 5,
        paddingLeft: "15%",
    },
    backgroundBottom: {
        backgroundColor: "#080808",
        flex: 0,
    },
    topRightButton: {
        color: "#f5f6fa",
        fontSize: 40,
    },
    topLeftButton: {
        color: "#f5f6fa",
        fontSize: 40,
    },
    profilePicture: {
        alignSelf: "center",
        backgroundColor: "#383838",
    },
    spacedRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: "10%",
    },
    leftRow: {
        flexDirection: "row",
        margin: "5%",
    },
    bio: {
        backgroundColor: "#718093",
        width: "90%",
        borderColor: "#f5f6fa",
        borderRadius: 15,
        alignSelf: "center",
        marginTop: "5%",
    },
    bioText: {
        fontSize: 13,
        margin: "5%",
        color: "#f5f6fa",
    },
    profileText: {
        textAlign: "center",
        fontSize: 18,
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "2%",
        fontWeight: "bold",
        color: "#f5f6fa",
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start",
        width: "70%",
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#080808",
        padding: 10,
        margin: 5,
        color: "#080808",
        borderRadius: 5,
        backgroundColor: "#d3d3d3",
        alignSelf: "center",
    },
    postSnippet: {
        backgroundColor: "#183253",
        margin: "1%",
        borderRadius: 10,
    },
    postTitle: {
        fontSize: 20,
        margin: "5%",
        marginTop: "0%",
        fontWeight: "bold",
        color: "#f5f6fa",
    },
    postContent: {
        fontSize: 16,
        margin: "5%",
        marginTop: "0%",
        color: "#f5f6fa",
    },
    comment: {
        backgroundColor: "#4A777A",
        margin: "1%",
        borderRadius: 10,
    },
    timestamp: {
        fontSize: 16,
        margin: "5%",
        marginTop: "2.5%",
        color: "#adadad",
        marginLeft: "auto",
    },
    numBelowIcon: {
        textAlign: "center",
        fontSize: 20,
        paddingTop: "3%",
        color: "#adadad",
    },
    usernamePostSnip: {
        fontSize: 16,
        margin: "5%",
        marginTop: "2.5%",
        marginBottom: "2.5%",
        color: "#f5f6fa",
        fontWeight: "bold",
    },
    postButton: {
        color: "#adadad",
        fontSize: 30,
    },
    divider: {
        borderBottomColor: "#adadad",
        borderBottomWidth: 1,
        marginHorizontal: "5%",
        marginBottom: "5%",
    },
    likedButton: {
        color: "#F9AA33",
        fontSize: 30,
    },
    unlikedButton: {
        color: "#adadad",
        fontSize: 30,
    },
    commentsTitle: {
        fontSize: 20,
        margin: "5%",
        fontWeight: "bold",
        color: "#f5f6fa",
    },
    searchBarIcon: {
        color: "#f5f6fa",
        fontSize: 26,
    },
    placeholderText: {
        color: "#d3d3d3",
    },
    leaderboardRank: {
        color: "#f5f6fa",
    },
    leaderboardLabel: {
        color: "#f5f6fa",
    },
    leaderboardScore: {
        color: "#f5f6fa",
    },
    badge: {
        height: 70,
        width: 70,
    },
    bulb: {
        height: 45,
        width: 30,
        marginLeft: "5%",
        marginRight: "4%",
        marginTop: "-2%",
    },
})

// Light theme
export const altStyles: ThemeType = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f6fa",
    },
    button: {
        width: 150,
        padding: 5,
        backgroundColor: "#79CDCD",
        borderWidth: 2,
        borderColor: "#adadad",
        borderRadius: 10,
        alignSelf: "center",
        margin: "5%",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 20,
        color: "#080808",
        fontWeight: "bold",
        textAlign: "center",
    },
    inlineText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#080808",
        textAlign: "center",
        marginTop: "5%",
    },
    title: {
        textAlign: "center",
        fontSize: 40,
        margin: "5%",
        fontWeight: "bold",
        color: "#080808",
        marginTop: "15%",
    },
    subtitle: {
        textAlign: "center",
        fontSize: 22,
        margin: "5%",
        fontWeight: "bold",
        color: "#080808",
    },
    text: {
        textAlign: "left",
        fontSize: 20,
        marginTop: "5%",
        marginLeft: "15%",
        color: "#080808",
    },
    textInput: {
        width: "70%",
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#adadad",
        padding: 10,
        margin: 5,
        color: "#080808",
        borderRadius: 5,
        backgroundColor: "#d3d3d3",
        alignSelf: "center",
    },
    forgotPasswordText: {
        color: "#080808",
        textAlign: "left",
        margin: 5,
        paddingLeft: "15%",
        textDecorationLine: "underline",
    },
    errorText: {
        color: "#ff0033",
        textAlign: "left",
        margin: 5,
        paddingLeft: "15%",
    },
    backgroundBottom: {
        backgroundColor: "#080808",
        flex: 0,
    },
    topRightButton: {
        color: "#718093",
        fontSize: 40,
    },
    topLeftButton: {
        color: "#718093",
        fontSize: 40,
    },
    profilePicture: {
        alignSelf: "center",
        backgroundColor: "#383838",
    },
    spacedRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: "10%",
    },
    leftRow: {
        flexDirection: "row",
        margin: "5%",
    },
    bio: {
        backgroundColor: "#e4e6e7",
        width: "90%",
        borderColor: "#080808",
        borderRadius: 15,
        alignSelf: "center",
        marginTop: "5%",
    },
    bioText: {
        fontSize: 13,
        margin: "5%",
        color: "#080808",
    },
    profileText: {
        textAlign: "center",
        fontSize: 18,
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "2%",
        fontWeight: "bold",
        color: "#080808",
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start",
        width: "70%",
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#080808",
        padding: 10,
        margin: 5,
        color: "#080808",
        borderRadius: 5,
        backgroundColor: "#d3d3d3",
        alignSelf: "center",
    },
    postSnippet: {
        backgroundColor: "#7AC5CD",
        margin: "1%",
        borderRadius: 10,
    },
    postTitle: {
        fontSize: 20,
        margin: "5%",
        marginTop: "0%",
        fontWeight: "bold",
        color: "#080808",
    },
    postContent: {
        fontSize: 16,
        margin: "5%",
        marginTop: "0%",
        color: "#080808",
    },
    comment: {
        backgroundColor: "#ADD8E6",
        margin: "1%",
        borderRadius: 10,
    },
    timestamp: {
        fontSize: 16,
        margin: "5%",
        marginTop: "2.5%",
        color: "#545454",
        marginLeft: "auto",
    },
    numBelowIcon: {
        textAlign: "center",
        fontSize: 20,
        paddingTop: "3%",
        color: "#545454",
    },
    usernamePostSnip: {
        fontSize: 16,
        margin: "5%",
        marginTop: "2.5%",
        marginBottom: "2.5%",
        color: "#080808",
        fontWeight: "bold",
    },
    postButton: {
        color: "#545454",
        fontSize: 30,
    },
    divider: {
        borderBottomColor: "#545454",
        borderBottomWidth: 1,
        marginHorizontal: "5%",
        marginBottom: "5%",
    },
    likedButton: {
        color: "#F9AA33",
        fontSize: 30,
    },
    unlikedButton: {
        color: "#545454",
        fontSize: 30,
    },
    commentsTitle: {
        fontSize: 20,
        margin: "5%",
        fontWeight: "bold",
        color: "#080808",
    },
    searchBarIcon: {
        color: "#f5f6fa",
        fontSize: 26,
    },
    placeholderText: {
        color: "#d3d3d3",
    },
    leaderboardRank: {
        color: "#080808",
    },
    leaderboardLabel: {
        color: "#080808",
    },
    leaderboardScore: {
        color: "#080808",
    },
    badge: {
        height: 70,
        width: 70,
    },
    bulb: {
        height: 45,
        width: 30,
        marginLeft: "5%",
        marginRight: "4%",
        marginTop: "-2%",
    },
})

export default styles
