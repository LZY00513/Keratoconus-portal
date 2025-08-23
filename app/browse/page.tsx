"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Filter,
  Database,
  Calendar,
  FileImage,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react"
import Link from "next/link"

// Mock dataset data
const mockDatasets = [
  {
    id: 1,
    title: "Pentacam Topography Dataset - Severe KC",
    description: "High-resolution corneal topography data from 150 patients with severe keratoconus",
    type: "Topography",
    format: "PNG",
    date: "2024-01-15",
    device: "Pentacam HR",
    tags: ["Severe KC", "Topography", "Clinical"],
    thumbnail: "/corneal-topography-heatmap.png",
    downloads: 234,
    license: "CC BY 4.0",
  },
  {
    id: 2,
    title: "OCT Tomography - Early Stage Detection",
    description: "Optical coherence tomography scans for early keratoconus detection research",
    type: "Tomography",
    format: "TIFF",
    date: "2024-01-10",
    device: "Cirrus HD-OCT",
    tags: ["Early Stage", "OCT", "Screening"],
    thumbnail: "/oct-scan-cross-section.png",
    downloads: 189,
    license: "CC BY-NC 4.0",
  },
  {
    id: 3,
    title: "Clinical Measurements Database",
    description: "Comprehensive clinical data including visual acuity, refraction, and corneal measurements",
    type: "Clinical",
    format: "CSV",
    date: "2024-01-08",
    device: "Multiple",
    tags: ["Clinical", "Measurements", "Visual Acuity"],
    thumbnail: "/clinical-data-spreadsheet.png",
    downloads: 156,
    license: "CC BY 4.0",
  },
  {
    id: 4,
    title: "Scheimpflug Imaging - Progressive KC",
    description: "Longitudinal Scheimpflug imaging data tracking keratoconus progression over 2 years",
    type: "Topography",
    format: "PNG",
    date: "2024-01-05",
    device: "Pentacam AXL",
    tags: ["Progressive", "Longitudinal", "Scheimpflug"],
    thumbnail: "/scheimpflug-corneal-imaging.png",
    downloads: 298,
    license: "CC BY 4.0",
  },
  {
    id: 5,
    title: "Corneal Biomechanics Analysis",
    description: "Corneal response analyzer data for biomechanical property assessment",
    type: "Clinical",
    format: "CSV",
    date: "2024-01-03",
    device: "Ocular Response Analyzer",
    tags: ["Biomechanics", "CRA", "Stiffness"],
    thumbnail: "/biomechanics-analysis-chart.png",
    downloads: 167,
    license: "CC BY-NC 4.0",
  },
  {
    id: 6,
    title: "Placido Disc Topography Collection",
    description: "Large-scale placido disc topography dataset from multiple clinical sites",
    type: "Topography",
    format: "TIFF",
    date: "2023-12-28",
    device: "TMS-5",
    tags: ["Placido", "Multi-site", "Large Scale"],
    thumbnail: "/placido-disc-topography.png",
    downloads: 445,
    license: "CC BY 4.0",
  },
]

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDataType, setSelectedDataType] = useState("all")
  const [selectedFormat, setSelectedFormat] = useState("all")
  const [selectedDevice, setSelectedDevice] = useState("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(true)

  const itemsPerPage = 6
  const totalPages = Math.ceil(mockDatasets.length / itemsPerPage)

  const availableTags = [
    "Severe KC",
    "Topography",
    "Clinical",
    "Early Stage",
    "OCT",
    "Screening",
    "Measurements",
    "Visual Acuity",
    "Progressive",
    "Longitudinal",
    "Scheimpflug",
    "Biomechanics",
    "CRA",
    "Stiffness",
    "Placido",
    "Multi-site",
    "Large Scale",
  ]

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const filteredDatasets = mockDatasets.filter((dataset) => {
    const matchesSearch =
      dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedDataType === "all" || dataset.type === selectedDataType
    const matchesFormat = selectedFormat === "all" || dataset.format === selectedFormat
    const matchesDevice = selectedDevice === "all" || dataset.device === selectedDevice
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => dataset.tags.includes(tag))

    return matchesSearch && matchesType && matchesFormat && matchesDevice && matchesTags
  })

  const paginatedDatasets = filteredDatasets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
              <span className="text-emerald-600 font-medium">Browse</span>
              <Link href="/upload" className="text-slate-600 hover:text-emerald-600 font-medium">
                Upload
              </Link>
              <Link href="/docs" className="text-slate-600 hover:text-emerald-600 font-medium">
                Documentation
              </Link>
              <Link href="/admin" className="text-slate-600 hover:text-emerald-600 font-medium">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Browse Datasets</h1>
          <p className="text-slate-600">Explore our comprehensive collection of keratoconus research data</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search datasets by title, description, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? "w-80" : "w-0"} transition-all duration-300 overflow-hidden`}>
            <Card className="sticky top-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-bold">Filters</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-slate-500"
                >
                  <Filter className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Data Type Filter */}
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">Data Type</Label>
                  <Select value={selectedDataType} onValueChange={setSelectedDataType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Topography">Topography</SelectItem>
                      <SelectItem value="Tomography">Tomography</SelectItem>
                      <SelectItem value="Clinical">Clinical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* File Format Filter */}
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">File Format</Label>
                  <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Formats</SelectItem>
                      <SelectItem value="PNG">PNG</SelectItem>
                      <SelectItem value="TIFF">TIFF</SelectItem>
                      <SelectItem value="CSV">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Device Filter */}
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">Device/Instrument</Label>
                  <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Devices</SelectItem>
                      <SelectItem value="Pentacam HR">Pentacam HR</SelectItem>
                      <SelectItem value="Pentacam AXL">Pentacam AXL</SelectItem>
                      <SelectItem value="Cirrus HD-OCT">Cirrus HD-OCT</SelectItem>
                      <SelectItem value="TMS-5">TMS-5</SelectItem>
                      <SelectItem value="Ocular Response Analyzer">Ocular Response Analyzer</SelectItem>
                      <SelectItem value="Multiple">Multiple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Tags Filter */}
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-3 block">Tags</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {availableTags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={tag}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => handleTagToggle(tag)}
                        />
                        <Label htmlFor={tag} className="text-sm text-slate-600 cursor-pointer">
                          {tag}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedDataType("all")
                    setSelectedFormat("all")
                    setSelectedDevice("all")
                    setSelectedTags([])
                    setCurrentPage(1)
                  }}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toggle Filters Button (Mobile) */}
            {!showFilters && (
              <Button variant="outline" onClick={() => setShowFilters(true)} className="mb-6 md:hidden">
                <Filter className="w-4 h-4 mr-2" />
                Show Filters
              </Button>
            )}

            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-slate-600">
                Showing {paginatedDatasets.length} of {filteredDatasets.length} datasets
              </p>
              <div className="flex items-center space-x-2">
                <Label className="text-sm text-slate-600">Sort by:</Label>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="downloads">Most Downloaded</SelectItem>
                    <SelectItem value="title">Title A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dataset Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedDatasets.map((dataset) => (
                <Card key={dataset.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative">
                    <img
                      src={dataset.thumbnail || "/placeholder.svg"}
                      alt={dataset.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-t-lg flex items-center justify-center">
                      <Button
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-emerald-600 hover:bg-emerald-700"
                        asChild
                      >
                        <Link href={`/dataset/${dataset.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg font-bold text-slate-900 line-clamp-2">{dataset.title}</CardTitle>
                      <Badge variant="secondary" className="ml-2 bg-emerald-100 text-emerald-700">
                        {dataset.type}
                      </Badge>
                    </div>
                    <CardDescription className="text-slate-600 line-clamp-2">{dataset.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <div className="flex items-center">
                          <FileImage className="w-4 h-4 mr-1" />
                          {dataset.format}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(dataset.date).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {dataset.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {dataset.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{dataset.tags.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center text-sm text-slate-500">
                          <Download className="w-4 h-4 mr-1" />
                          {dataset.downloads} downloads
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {dataset.license}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
