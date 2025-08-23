"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Database,
  Download,
  LinkIcon,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Palette,
  Calendar,
  User,
  Building,
  Eye,
  ArrowLeft,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock dataset data - in real app this would come from API
const mockDataset = {
  id: 1,
  title: "Pentacam Topography Dataset - Severe KC",
  description:
    "High-resolution corneal topography data from 150 patients with severe keratoconus. This comprehensive dataset includes elevation maps, curvature data, and pachymetry measurements collected over a 6-month period. All data has been de-identified and anonymized according to HIPAA guidelines.",
  type: "Topography",
  format: "PNG",
  date: "2024-01-15",
  device: "Pentacam HR",
  tags: ["Severe KC", "Topography", "Clinical", "Elevation Maps", "Curvature", "Pachymetry"],
  mainImage: "/corneal-topography-heatmap.png",
  downloads: 234,
  views: 1847,
  license: "CC BY 4.0",
  resolution: "1024x1024",
  fileSize: "2.3 GB",
  sampleCount: 150,
  institution: "Johns Hopkins University",
  author: "Dr. Sarah Chen, MD",
  doi: "10.1234/kc-data.2024.001",
  citation:
    "Chen, S. et al. (2024). Pentacam Topography Dataset - Severe KC. KC Data Portal. DOI: 10.1234/kc-data.2024.001",
  methodology:
    "Patients were scanned using Pentacam HR with standardized protocols. Three measurements per eye were taken and averaged. Quality control included automated artifact detection and manual review.",
  ethicsApproval: "IRB-2023-KC-001",
  fundingSource: "NIH Grant EY123456",
}

const relatedDatasets = [
  {
    id: 2,
    title: "OCT Tomography - Early Stage Detection",
    thumbnail: "/oct-scan-cross-section.png",
    type: "Tomography",
  },
  {
    id: 4,
    title: "Scheimpflug Imaging - Progressive KC",
    thumbnail: "/scheimpflug-corneal-imaging.png",
    type: "Topography",
  },
  {
    id: 5,
    title: "Corneal Biomechanics Analysis",
    thumbnail: "/biomechanics-analysis-chart.png",
    type: "Clinical",
  },
  {
    id: 6,
    title: "Placido Disc Topography Collection",
    thumbnail: "/placido-disc-topography.png",
    type: "Topography",
  },
]

export default function DatasetDetailPage() {
  const params = useParams()
  const [zoomLevel, setZoomLevel] = useState(100)
  const [colormap, setColormap] = useState("default")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const sampleImages = [
    "/corneal-topography-heatmap.png",
    "/scheimpflug-corneal-imaging.png",
    "/oct-scan-cross-section.png",
  ]

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(200, prev + 25))
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(50, prev - 25))
  const handleReset = () => setZoomLevel(100)

  const colormaps = [
    { id: "default", name: "Default", color: "bg-gradient-to-r from-blue-500 to-red-500" },
    { id: "grayscale", name: "Grayscale", color: "bg-gradient-to-r from-gray-800 to-gray-200" },
    { id: "hot", name: "Hot", color: "bg-gradient-to-r from-black via-red-500 to-yellow-400" },
    { id: "cool", name: "Cool", color: "bg-gradient-to-r from-cyan-500 to-blue-500" },
  ]

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
              <Link href="/admin" className="text-slate-600 hover:text-emerald-600 font-medium">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-emerald-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/browse" className="hover:text-emerald-600">
            Browse
          </Link>
          <span>/</span>
          <span className="text-slate-900">Dataset {params.id}</span>
        </div>

        {/* Back Button */}
        <Button variant="outline" asChild className="mb-6 bg-transparent">
          <Link href="/browse">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Browse
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Preview Area */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-black text-slate-900">{mockDataset.title}</CardTitle>
                  <Badge className="bg-emerald-100 text-emerald-700">{mockDataset.type}</Badge>
                </div>
                <CardDescription className="text-slate-600 text-lg leading-relaxed">
                  {mockDataset.description}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Image Preview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold">Dataset Preview</CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-500">Zoom: {zoomLevel}%</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Image Controls */}
                <div className="flex items-center justify-between mb-4 p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" onClick={handleZoomOut}>
                            <ZoomOut className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Zoom Out</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" onClick={handleZoomIn}>
                            <ZoomIn className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Zoom In</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" onClick={handleReset}>
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Reset View</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Colormap Controls */}
                  <div className="flex items-center space-x-2">
                    <Palette className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">Colormap:</span>
                    {colormaps.map((map) => (
                      <TooltipProvider key={map.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => setColormap(map.id)}
                              className={`w-8 h-6 rounded ${map.color} border-2 ${
                                colormap === map.id ? "border-emerald-500" : "border-slate-300"
                              }`}
                            />
                          </TooltipTrigger>
                          <TooltipContent>{map.name}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>

                {/* Main Image */}
                <div className="relative bg-slate-100 rounded-lg overflow-hidden" style={{ height: "500px" }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={sampleImages[currentImageIndex] || "/placeholder.svg"}
                      alt="Dataset preview"
                      className="max-w-full max-h-full object-contain transition-transform duration-200"
                      style={{ transform: `scale(${zoomLevel / 100})` }}
                    />
                  </div>

                  {/* Navigation arrows for multiple images */}
                  {sampleImages.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentImageIndex((prev) => (prev === 0 ? sampleImages.length - 1 : prev - 1))
                        }
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          setCurrentImageIndex((prev) => (prev === sampleImages.length - 1 ? 0 : prev + 1))
                        }
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Image thumbnails */}
                {sampleImages.length > 1 && (
                  <div className="flex space-x-2 mt-4 justify-center">
                    {sampleImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-16 h-16 rounded border-2 overflow-hidden ${
                          currentImageIndex === index ? "border-emerald-500" : "border-slate-300"
                        }`}
                      >
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Metadata Sidebar */}
          <div className="space-y-6">
            {/* Download Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download Dataset
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Copy API Link
                </Button>
                <div className="flex items-center justify-between text-sm text-slate-500 pt-2">
                  <div className="flex items-center">
                    <Download className="w-4 h-4 mr-1" />
                    {mockDataset.downloads} downloads
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {mockDataset.views} views
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Metadata */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Dataset Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Type:</span>
                    <p className="font-medium">{mockDataset.type}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Format:</span>
                    <p className="font-medium">{mockDataset.format}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Resolution:</span>
                    <p className="font-medium">{mockDataset.resolution}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">File Size:</span>
                    <p className="font-medium">{mockDataset.fileSize}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Samples:</span>
                    <p className="font-medium">{mockDataset.sampleCount}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Device:</span>
                    <p className="font-medium">{mockDataset.device}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <span className="text-slate-500 text-sm">Upload Date:</span>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                    <span className="font-medium">{new Date(mockDataset.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-slate-500 text-sm">Tags:</span>
                  <div className="flex flex-wrap gap-1">
                    {mockDataset.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Author & Institution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Attribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-slate-400" />
                    <span className="font-medium">{mockDataset.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-2 text-slate-400" />
                    <span className="text-slate-600">{mockDataset.institution}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <span className="text-slate-500 text-sm">License:</span>
                  <Badge variant="outline">{mockDataset.license}</Badge>
                </div>

                <div className="space-y-2">
                  <span className="text-slate-500 text-sm">DOI:</span>
                  <p className="text-sm font-mono bg-slate-50 p-2 rounded">{mockDataset.doi}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-slate-500 text-sm">Citation:</span>
                  <p className="text-sm bg-slate-50 p-3 rounded leading-relaxed">{mockDataset.citation}</p>
                </div>
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Research Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <span className="text-slate-500 text-sm">Methodology:</span>
                  <p className="text-sm text-slate-700 leading-relaxed">{mockDataset.methodology}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div>
                    <span className="text-slate-500">Ethics Approval:</span>
                    <p className="font-medium">{mockDataset.ethicsApproval}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Funding:</span>
                    <p className="font-medium">{mockDataset.fundingSource}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Datasets */}
        <div className="mt-12">
          <h2 className="text-2xl font-black text-slate-900 mb-6">Related Datasets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedDatasets.map((dataset) => (
              <Card key={dataset.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <Link href={`/dataset/${dataset.id}`}>
                  <div className="relative">
                    <img
                      src={dataset.thumbnail || "/placeholder.svg"}
                      alt={dataset.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-t-lg" />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-slate-900 line-clamp-2">{dataset.title}</CardTitle>
                    <Badge variant="secondary" className="w-fit bg-emerald-100 text-emerald-700 text-xs">
                      {dataset.type}
                    </Badge>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
