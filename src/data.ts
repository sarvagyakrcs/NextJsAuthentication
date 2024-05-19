/**
 * Specifies the Project name, can be changed later
 * @type[string]
 */
export const PROJECT_NAME = "SilkRoute"

/**
 * Specifies the Base URL of the project, can be changed later
 * @type[string]
 */
export const BASE_URL = "http://localhost:3000"

/**
 * Time after which the verification token expires
 * @type {number}
 */
export const VERIFICATION_TOKEN_EXPIRE_TIME : number = 3600;

/**
 * 
 */
export const MenuItems = [
    {
        label: "Home",
        url: "/home",
        icon: "/home-icon.svg"
    },
    {
        label: "Explore",
        url: "/explore",
        icon: "/explore-icon.svg"
    },
    {
        label: "Notifications",
        url: "/notifications",
        icon: "/notifications-icon.svg"
    },
    {
        label: "Messages",
        url: "/messages",
        icon: "/messages-icon.svg"
    },
    {
        label: "Profile",
        url: "/profile",
        icon: "/profile-icon.svg"
    },
]

/**
 * Data for Home Page incl Heading etc
 * @type {{Heading: string, Subheading: string}}
 */
export const homepage_data = {
    Heading: "Freedom to Sell, Power to Buy!",
    Subheading: "Your Campus Marketplace!"
}