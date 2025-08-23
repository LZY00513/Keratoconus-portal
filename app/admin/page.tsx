"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Database,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MessageSquare,
  User,
  Calendar,
  AlertTriangle,
  Home,
  Search,
} from "lucide-react"
import Link from "next/link"

// Mock pending datasets
const mockPendingDatasets = [
  {
    id: 1,
    title: "Advanced Pentacam Analysis - Subclinical KC",
    type: "Topography",
    uploader: "Dr. Maria Rodriguez",
    institution: "Stanford University",
    email: "mrodriguez@stanford.edu",
    uploadDate: "2024-01-20",
    fileCount: 45,
    fileSize: "1.2 GB",
    thumbnail: "/corneal-topography-heatmap.png",
    status: "pending",
    priority: "high",
    description:
      "Comprehensive topographic analysis of subclinical keratoconus cases with longitudinal follow-up data.",
    tags: ["Subclinical", "Pentacam", "Longitudinal"],
    complianceChecks: {
      deidentified: true,
      ethicsApproval: true,
      dataRights: true,
      licenseAgreement: true,
    },
    qualityScore: 92,
  },
  {
    id: 2,
    title: "OCT Pachymetry Maps - Pediatric KC",
    type: "Tomography",
    uploader: "Dr. James Chen",
    institution: "Johns Hopkins",
    email: "jchen@jhmi.edu",
    uploadDate: "2024-01-19",
    fileCount: 28,
    fileSize: "850 MB",
    thumbnail: "/oct-scan-cross-section.png",
    status: "pending",
    priority: "medium",
    description: "OCT-based pachymetry measurements in pediatric keratoconus patients aged 8-16 years.",
    tags: ["Pediatric", "OCT", "Pachymetry"],
    complianceChecks: {
      deidentified: true,
      ethicsApproval: true,
      dataRights: false,
      licenseAgreement: true,
    },
    qualityScore: 87,
  },
  {
    id: 3,
    title: "Clinical Outcomes Post-CXL Treatment",
    type: "Clinical",
    uploader: "Dr. Sarah Kim",
    institution: "UCLA Medical Center",
    email: "skim@ucla.edu",
    uploadDate: "2024-01-18",
    fileCount: 156,
    fileSize: "2.1 GB",
    thumbnail: "/clinical-data-spreadsheet.png",
    status: "under_review",
    priority: "high",
    description: "5-year follow-up data on visual acuity and topographic changes after corneal cross-linking.",
    tags: ["CXL", "Outcomes", "Long-term"],
    complianceChecks: {
      deidentified: true,
      ethicsApproval: true,
      dataRights: true,
      licenseAgreement: true,
    },
    qualityScore: 95,
  },
  {
    id: 4,
    title: "Biomechanical Properties Analysis",
    type: "Clinical",
    uploader: "Dr. Ahmed Hassan",
    institution: "King's College London",
    email: "a.hassan@kcl.ac.uk",
    uploadDate: "2024-01-17",
    fileCount: 67,
    fileSize: "450 MB",
    thumbnail: "/biomechanics-analysis-chart.png",
    status: "needs_revision",
    priority: "low",
    description: "Corneal response analyzer data comparing normal and keratoconic eyes.",
    tags: ["Biomechanics", "CRA", "Comparison"],
    complianceChecks: {
      deidentified: false,
      ethicsApproval: true,
      dataRights: true,
      licenseAgreement: true,
    },
    qualityScore: 73,
  },
]

const mockReviewedDatasets = [
  {
    id: 5,
    title: "Scheimpflug Imaging Database",
    uploader: "Dr. Lisa Wang",
    institution: "Mayo Clinic",
    reviewDate: "2024-01-15",
    status: "approved",
    reviewer: "Admin User",
  },
  {
    id: 6,
    title: "Placido Disc Topography Collection",
    uploader: "Dr. Robert Smith",
    institution: "Harvard Medical School",
    reviewDate: "2024-01-14",
    status: "rejected",
    reviewer: "Admin User",
    rejectionReason: "Insufficient metadata provided",
  },
]

export default function AdminPage() {
  const [selectedDataset, setSelectedDataset] = useState<any>(null)
  const [reviewAction, setReviewAction] = useState("")
  const [reviewComment, setReviewComment] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showReviewModal, setShowReviewModal] = useState(false)

  const handleReview = (dataset: any, action: string) => {
    setSelectedDataset(dataset)
    setReviewAction(action)
    setShowReviewModal(true)
  }

  const submitReview = () => {
    // In a real app, this would submit to an API
    console.log("Review submitted:", {
      datasetId: selectedDataset?.id,
      action: reviewAction,
      comment: reviewComment,
    })
    setShowReviewModal(false)
    setReviewComment("")
    setSelectedDataset(null)
    setReviewAction("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
      case "under_review":
        return <Badge className="bg-blue-100 text-blue-700">Under Review</Badge>
      case "needs_revision":
        return <Badge className="bg-orange-100 text-orange-700">Needs Revision</Badge>
      case "approved":
        return <Badge className="bg-emerald-100 text-emerald-700">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-700">Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-700">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-700">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-700">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const filteredDatasets = mockPendingDatasets.filter((dataset) => {
    const matchesStatus = filterStatus === "all" || dataset.status === filterStatus
    const matchesSearch =
      dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.uploader.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.institution.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-slate-900">KC Data Portal</h1>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-slate-600 hover:text-emerald-600 font-medium flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <Link href="/browse" className="text-slate-600 hover:text-emerald-600 font-medium">
                Browse
              </Link>
              <Link href="/upload" className="text-slate-600 hover:text-emerald-600 font-medium">
                Upload
              </Link>
              <Link href="/docs" className="text-slate-600 hover:text-emerald-600 font-medium">
                Documentation
              </Link>
              <span className="text-emerald-600 font-medium">Admin</span>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">Review and manage dataset submissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-slate-500">+3 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-slate-500">+2 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Need Revision</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-slate-500">-1 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Datasets</CardTitle>
              <Database className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-slate-500">+12 this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">Pending Review</TabsTrigger>
            <TabsTrigger value="reviewed">Review History</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="search">Search</Label>
                    <div className="relative mt-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        id="search"
                        placeholder="Search by title, author, or institution..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="w-48">
                    <Label htmlFor="status">Status</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="under_review">Under Review</SelectItem>
                        <SelectItem value="needs_revision">Needs Revision</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Datasets Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Pending Datasets ({filteredDatasets.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dataset</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Quality</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDatasets.map((dataset) => (
                      <TableRow key={dataset.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img
                              src={dataset.thumbnail || "/placeholder.svg"}
                              alt={dataset.title}
                              className="w-12 h-12 rounded object-cover"
                            />
                            <div>
                              <p className="font-medium text-slate-900 line-clamp-1">{dataset.title}</p>
                              <p className="text-sm text-slate-500">
                                {dataset.type} • {dataset.fileCount} files • {dataset.fileSize}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-slate-900">{dataset.uploader}</p>
                            <p className="text-sm text-slate-500">{dataset.institution}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm text-slate-600">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(dataset.uploadDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(dataset.status)}</TableCell>
                        <TableCell>{getPriorityBadge(dataset.priority)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-emerald-600 h-2 rounded-full"
                                style={{ width: `${dataset.qualityScore}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{dataset.qualityScore}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>{dataset.title}</DialogTitle>
                                  <DialogDescription>Dataset review details</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <img
                                        src={dataset.thumbnail || "/placeholder.svg"}
                                        alt={dataset.title}
                                        className="w-full h-48 object-cover rounded-lg"
                                      />
                                    </div>
                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="font-medium text-slate-900">Author Information</h4>
                                        <p className="text-sm text-slate-600">
                                          <User className="w-4 h-4 inline mr-1" />
                                          {dataset.uploader}
                                        </p>
                                        <p className="text-sm text-slate-600">{dataset.institution}</p>
                                        <p className="text-sm text-slate-600">{dataset.email}</p>
                                      </div>
                                      <div>
                                        <h4 className="font-medium text-slate-900">Dataset Details</h4>
                                        <p className="text-sm text-slate-600">Type: {dataset.type}</p>
                                        <p className="text-sm text-slate-600">Files: {dataset.fileCount}</p>
                                        <p className="text-sm text-slate-600">Size: {dataset.fileSize}</p>
                                        <p className="text-sm text-slate-600">Quality Score: {dataset.qualityScore}%</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium text-slate-900 mb-2">Description</h4>
                                    <p className="text-sm text-slate-600">{dataset.description}</p>
                                  </div>

                                  <div>
                                    <h4 className="font-medium text-slate-900 mb-2">Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {dataset.tags.map((tag: string) => (
                                        <Badge key={tag} variant="outline">
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium text-slate-900 mb-2">Compliance Checks</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="flex items-center space-x-2">
                                        {dataset.complianceChecks.deidentified ? (
                                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                                        ) : (
                                          <XCircle className="w-4 h-4 text-red-600" />
                                        )}
                                        <span className="text-sm">De-identified</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        {dataset.complianceChecks.ethicsApproval ? (
                                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                                        ) : (
                                          <XCircle className="w-4 h-4 text-red-600" />
                                        )}
                                        <span className="text-sm">Ethics Approval</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        {dataset.complianceChecks.dataRights ? (
                                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                                        ) : (
                                          <XCircle className="w-4 h-4 text-red-600" />
                                        )}
                                        <span className="text-sm">Data Rights</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        {dataset.complianceChecks.licenseAgreement ? (
                                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                                        ) : (
                                          <XCircle className="w-4 h-4 text-red-600" />
                                        )}
                                        <span className="text-sm">License Agreement</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <div className="flex space-x-2">
                                    <Button
                                      onClick={() => handleReview(dataset, "approve")}
                                      className="bg-emerald-600 hover:bg-emerald-700"
                                    >
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Approve
                                    </Button>
                                    <Button onClick={() => handleReview(dataset, "reject")} variant="destructive">
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Reject
                                    </Button>
                                    <Button
                                      onClick={() => handleReview(dataset, "revision")}
                                      variant="outline"
                                      className="bg-transparent"
                                    >
                                      <MessageSquare className="w-4 h-4 mr-2" />
                                      Request Revision
                                    </Button>
                                  </div>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            <Button
                              onClick={() => handleReview(dataset, "approve")}
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-700"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button onClick={() => handleReview(dataset, "reject")} size="sm" variant="destructive">
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviewed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Review History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dataset</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Review Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reviewer</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockReviewedDatasets.map((dataset) => (
                      <TableRow key={dataset.id}>
                        <TableCell>
                          <p className="font-medium text-slate-900">{dataset.title}</p>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-slate-900">{dataset.uploader}</p>
                            <p className="text-sm text-slate-500">{dataset.institution}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm text-slate-600">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(dataset.reviewDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(dataset.status)}</TableCell>
                        <TableCell>
                          <p className="text-sm text-slate-600">{dataset.reviewer}</p>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Review Modal */}
        <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {reviewAction === "approve" && "Approve Dataset"}
                {reviewAction === "reject" && "Reject Dataset"}
                {reviewAction === "revision" && "Request Revision"}
              </DialogTitle>
              <DialogDescription>{selectedDataset?.title}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="comment">
                  {reviewAction === "approve" && "Approval Comments (Optional)"}
                  {reviewAction === "reject" && "Rejection Reason *"}
                  {reviewAction === "revision" && "Revision Requirements *"}
                </Label>
                <Textarea
                  id="comment"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder={
                    reviewAction === "approve"
                      ? "Add any comments for the author..."
                      : reviewAction === "reject"
                        ? "Explain why this dataset is being rejected..."
                        : "Specify what changes are needed..."
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowReviewModal(false)} className="bg-transparent">
                Cancel
              </Button>
              <Button
                onClick={submitReview}
                className={
                  reviewAction === "approve"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : reviewAction === "reject"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-orange-600 hover:bg-orange-700"
                }
                disabled={(reviewAction === "reject" || reviewAction === "revision") && !reviewComment.trim()}
              >
                {reviewAction === "approve" && "Approve Dataset"}
                {reviewAction === "reject" && "Reject Dataset"}
                {reviewAction === "revision" && "Request Revision"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
