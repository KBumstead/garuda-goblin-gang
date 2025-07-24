import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'

import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  User, 
  Trophy, 
  Dumbbell, 
  Users, 
  Database,
  PlusCircle,
  CircleDot
} from 'lucide-react'
import { UserRole, ActiveView, MenuItem } from '../../types'

interface AppSidebarProps {
  userRole: UserRole
  activeView: ActiveView
  onRoleChange: (role: UserRole) => void
  onViewChange: (view: ActiveView) => void
  onLogout: () => void
}

export function AppSidebar({ userRole, activeView, onRoleChange, onViewChange, onLogout }: AppSidebarProps) {
  const userMenuItems: MenuItem[] = [
    { key: 'dashboard', label: 'Dashboard', icon: User },
    { key: 'rankings', label: 'Player Rankings', icon: Trophy },
    { key: 'training', label: 'Training Programs', icon: Dumbbell },
    { key: 'clubs', label: 'Clubs', icon: Users },
    { key: 'profile', label: 'Profile', icon: User },
  ]

  const scoutMenuItems: MenuItem[] = [
    { key: 'dashboard', label: 'Dashboard', icon: User },
    { key: 'database', label: 'Player Database', icon: Database },
    { key: 'add-review', label: 'Add Match Review', icon: PlusCircle },
    { key: 'profile', label: 'Profile', icon: User },
  ]

  const trainerMenuItems: MenuItem[] = [
    { key: 'dashboard', label: 'Dashboard', icon: User },
    { key: 'training', label: 'Training Programs', icon: Dumbbell },
    { key: 'clubs', label: 'Clubs', icon: Users },
    { key: 'profile', label: 'Profile', icon: User },
  ];

  const menuItems = userRole === 'user' ? userMenuItems : userRole === 'trainer' ? trainerMenuItems : scoutMenuItems

  return (
    <Sidebar className="border-r border-border h-full">
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup className="flex-1 flex flex-col">
          <SidebarGroupLabel className="px-4 py-4">
            <div className="flex items-center gap-2">
              <CircleDot className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">PickUp</span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex-1 flex flex-col">
            <div className="px-4 py-2">
              <Select value={userRole} onValueChange={(value: UserRole) => onRoleChange(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User/Viewer</SelectItem>
                  <SelectItem value="scout">Scout/Media</SelectItem>
                  <SelectItem value="trainer">Trainer/Coach</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    isActive={activeView === item.key}
                    onClick={() => onViewChange(item.key as ActiveView)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <div className="flex-1" />
            <div className="px-4 py-2">
              <Button
                className="w-full flex items-center justify-center gap-2 bg-[#f46036] text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#d94e1f] focus:bg-[#d94e1f] focus:outline-none focus:ring-2 focus:ring-[#f46036]/50 transition"
                onClick={onLogout}
                aria-label="Log Out"
              >
                <LogOut className="w-5 h-5" />
                Log Out
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}