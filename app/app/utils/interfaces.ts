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

export interface robotPart { // also used for gacha results
    name: string,
    body_part: string,
    sprite_url: string,
    rarity_val: number,
    stat: number
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

export interface builtRobot { // a robot you build
    name: string
    head: robotPart | null,
    body: robotPart | null,
    leftArm: robotPart | null,
    rightArm: robotPart | null,
    leftLeg: robotPart | null,
    rightLeg: robotPart | null
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