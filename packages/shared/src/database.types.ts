export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      agent_assignments: {
        Row: {
          active: boolean
          agent: string
          created_at: string
          dedicated_location: string
          id: string
          shifts: Json
        }
        Insert: {
          active?: boolean
          agent: string
          created_at?: string
          dedicated_location: string
          id?: string
          shifts: Json
        }
        Update: {
          active?: boolean
          agent?: string
          created_at?: string
          dedicated_location?: string
          id?: string
          shifts?: Json
        }
        Relationships: [
          {
            foreignKeyName: "agent_assignments_agent_fkey"
            columns: ["agent"]
            isOneToOne: false
            referencedRelation: "organisation_branch_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_assignments_dedicated_location_fkey"
            columns: ["dedicated_location"]
            isOneToOne: false
            referencedRelation: "dedicated_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      dedicated_locations: {
        Row: {
          check_frequency: number
          client: string
          created_at: string
          id: string
          location: unknown
        }
        Insert: {
          check_frequency?: number
          client?: string
          created_at?: string
          id?: string
          location: unknown
        }
        Update: {
          check_frequency?: number
          client?: string
          created_at?: string
          id?: string
          location?: unknown
        }
        Relationships: [
          {
            foreignKeyName: "dedicated_locations_client_fkey"
            columns: ["client"]
            isOneToOne: false
            referencedRelation: "organisation_branch_members"
            referencedColumns: ["id"]
          },
        ]
      }
      organisation_branch_members: {
        Row: {
          branch: string
          created_at: string
          id: string
          metadata: Json | null
          role: Database["public"]["Enums"]["organisation_roles"]
          user: string
        }
        Insert: {
          branch: string
          created_at?: string
          id?: string
          metadata?: Json | null
          role: Database["public"]["Enums"]["organisation_roles"]
          user: string
        }
        Update: {
          branch?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          role?: Database["public"]["Enums"]["organisation_roles"]
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "organisation_branch_members_branch_fkey"
            columns: ["branch"]
            isOneToOne: false
            referencedRelation: "organisation_branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organisation_branch_members_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      organisation_branches: {
        Row: {
          created_at: string
          id: string
          name: string
          organisation: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          organisation: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          organisation?: string
        }
        Relationships: [
          {
            foreignKeyName: "organisation_branches_organisation_fkey"
            columns: ["organisation"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
      organisations: {
        Row: {
          admin: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          admin: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          admin?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          accepted_terms: boolean
          created_at: string
          device_fcm_ids: string[] | null
          email: string
          emergency_phone: number | null
          home_address: string | null
          id: string
          name: string
          phone: number
          profile_picture: string | null
        }
        Insert: {
          accepted_terms: boolean
          created_at?: string
          device_fcm_ids?: string[] | null
          email: string
          emergency_phone?: number | null
          home_address?: string | null
          id: string
          name: string
          phone: number
          profile_picture?: string | null
        }
        Update: {
          accepted_terms?: boolean
          created_at?: string
          device_fcm_ids?: string[] | null
          email?: string
          emergency_phone?: number | null
          home_address?: string | null
          id?: string
          name?: string
          phone?: number
          profile_picture?: string | null
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
      organisation_roles: "manager" | "editor" | "client" | "agent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      organisation_roles: ["manager", "editor", "client", "agent"],
    },
  },
} as const

