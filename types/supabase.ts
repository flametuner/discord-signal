export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user: {
        Row: {
          created_at: string | null
          discord_id: string
          email: string | null
          id: string
          linear_id: string | null
          linear_token: string | null
          webhook_id: string | null
        }
        Insert: {
          created_at?: string | null
          discord_id: string
          email?: string | null
          id: string
          linear_id?: string | null
          linear_token?: string | null
          webhook_id?: string | null
        }
        Update: {
          created_at?: string | null
          discord_id?: string
          email?: string | null
          id?: string
          linear_id?: string | null
          linear_token?: string | null
          webhook_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
