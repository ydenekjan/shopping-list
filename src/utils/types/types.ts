export interface IMember {
  _id: string;
  permissions: {
    edits: boolean;
    members: boolean;
  };
  user: IUser;
}

export interface IUser {
  _id?: string;
  email: string;
  username: string;
  fullName: string;
}

export interface IItem {
  _id?: string;
  completed: boolean;
  itemName: string;
}

export interface IList {
  _id?: string;
  dateCreated: string;
  author: IUser;
  listName: string;
  members: IMember[];
  items: IItem[];
  archived: boolean;
}
