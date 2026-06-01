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
    bodyPart: string,
    spriteUrl: string,
    rarityName: string,
    rarityVal: number,
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