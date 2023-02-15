// deno-lint-ignore-file
import { Database } from "../_shared/types/supabase.ts";

export type LinearAction = "created" | "updated" | "deleted";
export type LinearType =
  | "Comment"
  | "Issue"
  | "IssueLabel"
  | "Project"
  | "Cycle"
  | "Reaction";

  export type LinearPayload = {
  action: LinearAction;
  type: LinearType;
  createdAt: string;
  data: any;
  url: string;
};

export interface Comment {
  id: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  issueId: string;
  userId: string;
  reactionData: any[];
  issue: IssueMinimal;
  user: User;
}

export interface IssueMinimal {
  id: string;
  title: string;
}

export interface User {
  id: string;
  name: string;
}

export interface Issue {
  id: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  title: string;
  priority: number;
  boardOrder: number;
  sortOrder: number;
  teamId: string;
  previousIdentifiers: any[];
  creatorId: string;
  stateId: string;
  priorityLabel: string;
  subscriberIds: string[];
  labelIds: any[];
  state: State;
  team: Team;
}

export interface State {
  id: string;
  name: string;
  color: string;
  type: string;
}

export interface Team {
  id: string;
  name: string;
  key: string;
}

export interface UserQuery {
  user: LinearUser;
}

export interface LinearUser {
  id: string;
  email: string;
  name: string;
}

export type SupabaseUser =  Database['public']['Tables']['user']['Row'];