export interface tradeRequest {
    sender: string,
    offering: robotPart,
    requesting: robotPart,
}

export interface loginData {
    email: string,
    password: string
}

export interface statSpread { // hp = head, arms = attack, body = def, legs = speed
    hp: number,
    attack: number,
    defense: number
    speed: number
}

export interface HistoryPull {
    part_id: string
    user_id: string
    timestamp: string
}

export interface robotPart { // also used for gacha results
    name: string,
    body_part: string,
    sprite_url: string,
    rarity_val: number,
    stat: number,
    part_id: string,
}

export interface robotSet { // robots from the db NOT CHANGED BY USER
    head: robotPart,
    body: robotPart,
    leftArm: robotPart,
    rightArm: robotPart,
    leftLeg: robotPart,
    rightLeg: robotPart
    stats: statSpread
}

export interface completedRobot { // a robot you build
    user_owned: string
    completed_robot_id: string,
    robot_name: string
}

export interface Rarity {
    max: number,
    min: number,
    rarityName: string,
    pieces: robotPart[]
}

export interface gachaStoreState {
    initialized: boolean, 
    probabilityTable: Rarity[]
}

export interface ResultType {
    part_id: string,
    item: robotPart,
    rarityName: string,
    class: string
}

export interface ownedRobotPart {
    uuid: string,
    user_id: string,
    part_id: string,
    completed_robot_id: string | null,
    quantity: number
}

export interface inventoryPart { // for both parts and robots in inventory
    uuid: string,
    user_id: string,
    part_id: string | null, // string for parts, null for robots
    completed_robot_id: string | null,
    quantity: number
}

export interface dbRobot {
    uuid: string,
    user_id: string
}

export interface itemBoxProp {
    inventoryPart: inventoryPart,
    itemInfo: robotPart
}

export interface filter {
    displayName: string, // what is on the button
    filterProp: string // what we will use for the filter
}

export interface PartIdLink {
    part_id: string,
    part: robotPart
}

export interface OwnedIdLink {
    part_id: string,
    part: ownedRobotPart
}

export interface TradeObject {
    uuid: string | null,
    receiver: string | null,
    sender: string | null,
    offer: string | null,
    request: string | null,

    offerPart: robotPart | null,
    requestPart: robotPart | null

    senderEmail: string | null,
    offerOwnedPart: ownedRobotPart | null, 
    requestOwnedPart: ownedRobotPart | null,
}