import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { Button } from './ui/button'
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
  const playerMenuItems: MenuItem[] = [
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

  const menuItems = userRole === 'player' ? playerMenuItems : scoutMenuItems

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-4">
            <div className="flex items-center gap-2">
              <CircleDot className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">BasketIndo</span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-4 py-2">
              <Select value={userRole} onValueChange={(value: UserRole) => onRoleChange(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="player">Player/Viewer</SelectItem>
                  <SelectItem value="scout">Scout/Media</SelectItem>
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
            <div className="px-4 py-2 mt-auto">
              <Button variant="outline" className="w-full" onClick={onLogout}>
                Log Out
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}