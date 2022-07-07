export enum MESSAGETYPE { 
    text='text',
    image="image"
 }
export interface SendMessageObject {
    message_content: string,
    user_name: string,
    uid: string,
    message_type: string,
    image_url?: string,
    group_id:string
}
export interface ReciveMessageObject extends SendMessageObject {
    create_at: string,
    message_key: string
}

export interface MessageGroupObject {
    group_id: string,
    group_name?:string,
    disabled?: boolean,
}

export interface GroupMessageArray{
    group:MessageGroupObject,
    messages:ReciveMessageObject[],
}





