export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      short_codes: {
        Row: {
          content: string | null
          created_at: string
          id: number
          is_url: boolean
          name: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          is_url?: boolean
          name: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          is_url?: boolean
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
