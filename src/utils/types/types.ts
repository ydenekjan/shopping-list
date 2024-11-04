export interface IUser {
  _id: string;
  email: string;
  username: string;
  fullName: string;
}

export interface IItem {
  isCompleted: boolean;
  itemName: string;
}

export interface IList {
  _id: string;
  dateCreated: string;
  author: string;
  listName: string;
  members: string[];
  items: IItem[];
  isArchived: boolean;
}
