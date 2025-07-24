import { useState } from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Textarea } from './components/ui/textarea'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { Checkbox } from './components/ui/checkbox'
import { 
  User, 
  Trophy, 
  GraduationCap, 
  Dumbbell, 
  Users, 
  FileText, 
  Database,
  PlusCircle,
  Star,
  MapPin,
  Calendar,
  Target,
  CircleDot,
  Upload
} from 'lucide-react'

type UserRole = 'player' | 'scout'
type ActiveView = 'login' | 'register' | 'dashboard' | 'rankings' | 'training' | 'clubs' | 'profile' | 'database' | 'add-review' | 'player-profile'

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>('player')
  const [activeView, setActiveView] = useState<ActiveView>('login')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const playerMenuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: User },
    { key: 'rankings', label: 'Player Rankings', icon: Trophy },
    { key: 'training', label: 'Training Programs', icon: Dumbbell },
    { key: 'clubs', label: 'Clubs', icon: Users },
    { key: 'profile', label: 'Profile', icon: User },
  ]

  const scoutMenuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: User },
    { key: 'database', label: 'Player Database', icon: Database },
    { key: 'add-review', label: 'Add Match Review', icon: PlusCircle },
    { key: 'profile', label: 'Profile', icon: User },
  ]

  const menuItems = userRole === 'player' ? playerMenuItems : scoutMenuItems

  const mockPlayers = [
    { rank: 1, name: 'Ahmad Pratama', school: 'SMA Jakarta Pusat', position: 'PG', ppg: 24.5, photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150' },
    { rank: 2, name: 'Budi Santoso', school: 'SMA Bandung 1', position: 'SG', ppg: 22.1, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { rank: 3, name: 'Citra Dewi', school: 'SMA Surabaya Elite', position: 'SF', ppg: 20.8, photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
    { rank: 4, name: 'Dedi Kurniawan', school: 'SMA Medan United', position: 'PF', ppg: 19.2, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
    { rank: 5, name: 'Eka Sari', school: 'SMA Yogyakarta', position: 'C', ppg: 18.7, photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
  ]

  const mockTrainingPrograms = [
    {
      id: 1,
      name: 'Elite Basketball Academy',
      organizer: 'Coach Rizky Abdillah',
      city: 'Jakarta',
      price: 'Rp 2,500,000',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300'
    },
    {
      id: 2,
      name: 'Youth Development Program',
      organizer: 'Indonesia Basketball Federation',
      city: 'Bandung',
      price: 'Rp 1,800,000',
      image: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=300'
    },
    {
      id: 3,
      name: 'Summer Basketball Camp',
      organizer: 'Pro Basketball Club',
      city: 'Surabaya',
      price: 'Rp 3,200,000',
      image: 'https://images.unsplash.com/photo-1559692048-79a3f837883d?w=300'
    },
  ]

  const mockClubs = [
    {
      id: 1,
      name: 'Jakarta Warriors',
      city: 'Jakarta',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100'
    },
    {
      id: 2,
      name: 'Bandung Lions',
      city: 'Bandung',
      logo: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=100'
    },
    {
      id: 3,
      name: 'Surabaya Eagles',
      city: 'Surabaya',
      logo: 'https://images.unsplash.com/photo-1559692048-79a3f837883d?w=100'
    },
  ]

  const handleLogin = () => {
    setIsAuthenticated(true)
    setActiveView('rankings')
  }

  const renderLoginPage = () => (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CircleDot className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">BasketIndo</span>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email"
                className="bg-input-background"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password"
                className="bg-input-background"
              />
            </div>
            
            <div className="text-right">
              <Button 
                variant="link" 
                className="p-0 h-auto text-secondary hover:text-primary"
              >
                Forgot Password?
              </Button>
            </div>
          </div>
          
          <Button 
            onClick={handleLogin}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Log In
          </Button>
          
          <div className="text-center">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Button 
              variant="link" 
              className="p-0 h-auto text-primary hover:text-primary/80"
              onClick={() => setActiveView('register')}
            >
              Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderRegisterPage = () => (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CircleDot className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">BasketIndo</span>
          </div>
          <CardTitle className="text-2xl">Register as Media/Scout</CardTitle>
          <CardDescription className="text-center">
            Gain access to review players, assign rankings, and add match commentary.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                type="text" 
                placeholder="Enter your full name"
                className="bg-input-background"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email"
                className="bg-input-background"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Create a password"
                className="bg-input-background"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="organization">Media Outlet / Organization Name</Label>
              <Input 
                id="organization" 
                type="text" 
                placeholder="Enter your organization name"
                className="bg-input-background"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="portfolio">Link to Portfolio or Profile (Optional)</Label>
              <Input 
                id="portfolio" 
                type="url" 
                placeholder="https://your-portfolio.com"
                className="bg-input-background"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="verification">Upload Verification Document</Label>
              <div className="border-2 border-dashed border-input rounded-lg p-4 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload ID or affiliation proof
                </p>
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{' '}
                <Button variant="link" className="p-0 h-auto text-primary">
                  Terms of Service
                </Button>
                {' '}and{' '}
                <Button variant="link" className="p-0 h-auto text-primary">
                  Privacy Policy
                </Button>
              </Label>
            </div>
          </div>
          
          <Button 
            onClick={handleLogin}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Submit Application
          </Button>
          
          <div className="text-center">
            <span className="text-muted-foreground">Already have an account? </span>
            <Button 
              variant="link" 
              className="p-0 h-auto text-primary hover:text-primary/80"
              onClick={() => setActiveView('login')}
            >
              Log In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPlayerRankings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2">
          <Trophy className="h-8 w-8 text-primary" />
          Player Rankings
        </h1>
        <div className="flex gap-4 bg-card/50 p-3 rounded-lg border border-border">
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Positions</SelectItem>
              <SelectItem value="pg">Point Guard</SelectItem>
              <SelectItem value="sg">Shooting Guard</SelectItem>
              <SelectItem value="sf">Small Forward</SelectItem>
              <SelectItem value="pf">Power Forward</SelectItem>
              <SelectItem value="c">Center</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="jakarta">Jakarta</SelectItem>
              <SelectItem value="bandung">Bandung</SelectItem>
              <SelectItem value="surabaya">Surabaya</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 text-primary">Rank</TableHead>
                <TableHead className="text-primary">Player</TableHead>
                <TableHead className="text-primary">School</TableHead>
                <TableHead className="text-primary">Position</TableHead>
                <TableHead className="text-primary">PPG</TableHead>
                <TableHead className="text-primary">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPlayers.map((player) => (
                <TableRow key={player.rank}>
                  <TableCell>#{player.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={player.photo} />
                        <AvatarFallback>{player.name[0]}</AvatarFallback>
                      </Avatar>
                      {player.name}
                    </div>
                  </TableCell>
                  <TableCell>{player.school}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{player.position}</Badge>
                  </TableCell>
                  <TableCell>{player.ppg}</TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      onClick={() => setActiveView('player-profile')}
                      className="bg-primary hover:bg-primary/90"
                    >
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const renderTrainingPrograms = () => (
    <div className="space-y-6">
      <h1 className="flex items-center gap-2">
        <Dumbbell className="h-8 w-8 text-primary" />
        Available Training Programs
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTrainingPrograms.map((program) => (
          <Card key={program.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img 
                src={program.image} 
                alt={program.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{program.name}</CardTitle>
              <CardDescription>
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {program.organizer}
                </span>
                <br />
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {program.city}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-lg text-primary">{program.price}</span>
                <Button className="bg-primary hover:bg-primary/90">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderClubs = () => (
    <div className="space-y-6">
      <h1 className="flex items-center gap-2">
        <Users className="h-8 w-8 text-primary" />
        Find a Club
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockClubs.map((club) => (
          <Card key={club.id}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={club.logo} />
                  <AvatarFallback>
                    <CircleDot className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{club.name}</CardTitle>
              <CardDescription>
                <span className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {club.city}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Learn More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderPlayerProfile = () => (
    <div className="space-y-6">
      <Button 
        variant="outline" 
        onClick={() => setActiveView('rankings')}
        className="mb-4"
      >
        ← Back to Rankings
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="text-center">
            <Avatar className="h-32 w-32 mx-auto mb-4">
              <AvatarImage src={mockPlayers[0].photo} />
              <AvatarFallback>{mockPlayers[0].name[0]}</AvatarFallback>
            </Avatar>
            <CardTitle>{mockPlayers[0].name}</CardTitle>
            <CardDescription>{mockPlayers[0].school}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Height</Label>
                <p>6'2"</p>
              </div>
              <div>
                <Label>Weight</Label>
                <p>180 lbs</p>
              </div>
              <div>
                <Label>Position</Label>
                <p>{mockPlayers[0].position}</p>
              </div>
              <div>
                <Label>PPG</Label>
                <p>{mockPlayers[0].ppg}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Player Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={userRole === 'scout' ? 'scout' : 'history'}>
                <TabsList>
                  {userRole === 'scout' && <TabsTrigger value="scout">Add Review & Ranking</TabsTrigger>}
                  <TabsTrigger value="history">Match History</TabsTrigger>
                </TabsList>
                
                {userRole === 'scout' && (
                  <TabsContent value="scout" className="space-y-4">
                    <div>
                      <Label>Scouting Notes & Comments</Label>
                      <Textarea 
                        placeholder="Enter your scouting notes and observations about this player..."
                        className="mt-2"
                        rows={6}
                      />
                    </div>
                    <div>
                      <Label>Assign Player Rank (1-100)</Label>
                      <Input 
                        type="number" 
                        min="1" 
                        max="100" 
                        placeholder="85"
                        className="mt-2"
                      />
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                      Submit Review
                    </Button>
                  </TabsContent>
                )}
                
                <TabsContent value="history">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4>Jakarta Warriors vs Bandung Lions</h4>
                        <span className="text-sm text-muted-foreground">Jan 15, 2024</span>
                      </div>
                      <p className="text-sm">Points: 28 | Assists: 6 | Rebounds: 4</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4>Surabaya Eagles vs Jakarta Warriors</h4>
                        <span className="text-sm text-muted-foreground">Jan 8, 2024</span>
                      </div>
                      <p className="text-sm">Points: 22 | Assists: 8 | Rebounds: 5</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderAddMatchReview = () => (
    <div className="space-y-6">
      <h1 className="flex items-center gap-2">
        <PlusCircle className="h-8 w-8 text-primary" />
        Submit a New Match Review
      </h1>
      
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Home Team</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select home team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jakarta-warriors">Jakarta Warriors</SelectItem>
                  <SelectItem value="bandung-lions">Bandung Lions</SelectItem>
                  <SelectItem value="surabaya-eagles">Surabaya Eagles</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Away Team</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select away team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jakarta-warriors">Jakarta Warriors</SelectItem>
                  <SelectItem value="bandung-lions">Bandung Lions</SelectItem>
                  <SelectItem value="surabaya-eagles">Surabaya Eagles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label>Match Date</Label>
            <Input 
              type="date" 
              className="mt-2"
            />
          </div>
          
          <div>
            <Label>Overall Match Summary</Label>
            <Textarea 
              placeholder="Provide an overall summary of the match, key moments, and standout performances..."
              className="mt-2"
              rows={4}
            />
          </div>
          
          <div>
            <Label>Individual Player Comments</Label>
            <div className="mt-2 space-y-4">
              <div className="border rounded-lg p-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a player from match roster" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPlayers.map((player) => (
                      <SelectItem key={player.rank} value={player.name}>
                        {player.name} - {player.position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea 
                  placeholder="Add specific notes about this player's performance..."
                  className="mt-2"
                  rows={3}
                />
              </div>
              <Button variant="outline" size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Another Player
              </Button>
            </div>
          </div>
          
          <Button className="w-full bg-primary hover:bg-primary/90">
            Publish Review
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderPlayerDatabase = () => (
    <div className="space-y-6">
      <h1 className="flex items-center gap-2">
        <Database className="h-8 w-8 text-primary" />
        Player Database
      </h1>
      {renderPlayerRankings()}
    </div>
  )

  const renderContent = () => {
    if (!isAuthenticated) {
      switch (activeView) {
        case 'login':
          return renderLoginPage()
        case 'register':
          return renderRegisterPage()
        default:
          return renderLoginPage()
      }
    }

    switch (activeView) {
      case 'rankings':
        return renderPlayerRankings()
      case 'training':
        return renderTrainingPrograms()
      case 'clubs':
        return renderClubs()
      case 'player-profile':
        return renderPlayerProfile()
      case 'database':
        return renderPlayerDatabase()
      case 'add-review':
        return renderAddMatchReview()
      default:
        return renderPlayerRankings()
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        {renderContent()}
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <SidebarProvider>
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
                  <Select value={userRole} onValueChange={(value: UserRole) => setUserRole(value)}>
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
                        onClick={() => setActiveView(item.key as ActiveView)}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
                <div className="px-4 py-2 mt-auto">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setIsAuthenticated(false)
                      setActiveView('login')
                    }}
                  >
                    Log Out
                  </Button>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </SidebarProvider>
    </div>
  )
}