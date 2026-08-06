import React, { useState } from 'react';
import type {
  UserRole,
  ResidentSocialProfile,
  CommunityPost,
  MarketplaceItem,
  LostAndFoundItem,
  VendorRecommendation,
  CarpoolRoute,
  InterestGroup
} from '../types';
import { StorageEngine } from '../services/storage';
import {
  MessageCircle,
  Plus,
  ShoppingBag,
  ShieldCheck,
  Star,
  Phone,
  Eye,
  EyeOff,
  ThumbsUp,
  Camera
} from 'lucide-react';

interface Props {
  role: UserRole;
}

export const Module09_CommunitySocial: React.FC<Props> = ({ role: _role }) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'marketplace' | 'lost_found' | 'recommendations' | 'carpool' | 'groups' | 'profiles'>('feed');

  // State
  const [posts, setPosts] = useState<CommunityPost[]>(StorageEngine.getCommunityPosts());
  const [marketplace, setMarketplace] = useState<MarketplaceItem[]>(StorageEngine.getMarketplaceItems());
  const [lostFound, setLostFound] = useState<LostAndFoundItem[]>(StorageEngine.getLostAndFound());
  const [recommendations, setRecommendations] = useState<VendorRecommendation[]>(StorageEngine.getRecommendations());
  const [carpools, setCarpools] = useState<CarpoolRoute[]>(StorageEngine.getCarpools());
  const [groups, setGroups] = useState<InterestGroup[]>(StorageEngine.getGroups());
  const [profiles, setProfiles] = useState<ResidentSocialProfile[]>(StorageEngine.getSocialProfiles());

  // Form Modals
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isMarketModalOpen, setIsMarketModalOpen] = useState(false);
  const [isLostModalOpen, setIsLostModalOpen] = useState(false);
  const [isRecModalOpen, setIsRecModalOpen] = useState(false);
  const [isCarpoolModalOpen, setIsCarpoolModalOpen] = useState(false);

  // New Post State
  const [newPost, setNewPost] = useState({
    flatId: 'A-101',
    category: 'General' as const,
    content: ''
  });

  // New Marketplace State
  const [newItem, setNewItem] = useState({
    flatId: 'A-101',
    title: '',
    category: 'Baby Gear' as const,
    price: 0,
    isFreeToTake: false,
    description: '',
    contactPhone: '+91 99000 15844'
  });

  // New Lost & Found State
  const [newLF, setNewLF] = useState({
    type: 'Found' as const,
    title: '',
    location: '',
    flatId: 'A-101',
    description: '',
    contactPhone: '+91 99000 15844'
  });

  // New Recommendation State
  const [newRec, setNewRec] = useState({
    flatId: 'A-101',
    serviceCategory: 'Plumber' as const,
    vendorName: '',
    vendorPhone: '',
    rating: 5,
    reviewText: ''
  });

  // New Carpool State
  const [newCarpool, setNewCarpool] = useState({
    flatId: 'A-101',
    driverName: 'Sadish Sugumaran',
    destination: 'Whitefield',
    departureTime: '08:30 AM',
    availableSeats: 2,
    notes: 'EV Car. Shared fuel.',
    phone: '+91 99000 15844'
  });

  // Post Comment State
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});

  const flats = StorageEngine.getFlats();

  // Handlers
  const handleLikePost = (postId: string) => {
    const updated = posts.map(p => {
      if (p.id === postId) {
        const isLiked = p.likedFlatIds.includes('A-101');
        const updatedLiked = isLiked ? p.likedFlatIds.filter(id => id !== 'A-101') : [...p.likedFlatIds, 'A-101'];
        return {
          ...p,
          likesCount: isLiked ? p.likesCount - 1 : p.likesCount + 1,
          likedFlatIds: updatedLiked
        };
      }
      return p;
    });
    setPosts(updated);
    StorageEngine.saveCommunityPosts(updated);
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    const updated = posts.map(p => {
      if (p.id === postId) {
        const commentObj = {
          id: `C-${Date.now().toString().slice(-4)}`,
          flatId: 'A-101',
          authorName: 'Sadish Sugumaran',
          commentText: text,
          createdAt: 'Just now'
        };
        return {
          ...p,
          comments: [...p.comments, commentObj]
        };
      }
      return p;
    });

    setPosts(updated);
    StorageEngine.saveCommunityPosts(updated);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const flatObj = flats.find(f => f.id === newPost.flatId);
    const postObj: CommunityPost = {
      id: `POST-${Date.now().toString().slice(-4)}`,
      flatId: newPost.flatId,
      authorName: flatObj?.ownerName || 'Resident',
      category: newPost.category,
      content: newPost.content,
      likesCount: 1,
      likedFlatIds: [newPost.flatId],
      comments: [],
      isPinned: false,
      createdAt: 'Just now'
    };

    const updated = [postObj, ...posts];
    setPosts(updated);
    StorageEngine.saveCommunityPosts(updated);
    setIsPostModalOpen(false);
  };

  const handleCreateMarketItem = (e: React.FormEvent) => {
    e.preventDefault();
    const flatObj = flats.find(f => f.id === newItem.flatId);
    const itemObj: MarketplaceItem = {
      id: `MKT-${Date.now().toString().slice(-4)}`,
      flatId: newItem.flatId,
      sellerName: flatObj?.ownerName || 'Resident',
      title: newItem.title,
      category: newItem.category,
      price: newItem.isFreeToTake ? 0 : Number(newItem.price),
      isFreeToTake: newItem.isFreeToTake,
      description: newItem.description,
      status: 'Available',
      createdAt: new Date().toISOString().split('T')[0],
      contactPhone: newItem.contactPhone
    };

    const updated = [itemObj, ...marketplace];
    setMarketplace(updated);
    StorageEngine.saveMarketplaceItems(updated);
    setIsMarketModalOpen(false);
  };

  const handleCreateLostFound = (e: React.FormEvent) => {
    e.preventDefault();
    const flatObj = flats.find(f => f.id === newLF.flatId);
    const lfObj: LostAndFoundItem = {
      id: `LF-${Date.now().toString().slice(-4)}`,
      type: newLF.type,
      title: newLF.title,
      location: newLF.location,
      date: new Date().toISOString().split('T')[0],
      flatId: newLF.flatId,
      contactName: flatObj?.ownerName || 'Resident',
      contactPhone: newLF.contactPhone,
      description: newLF.description,
      status: 'Active'
    };

    const updated = [lfObj, ...lostFound];
    setLostFound(updated);
    StorageEngine.saveLostAndFound(updated);
    setIsLostModalOpen(false);
  };

  const handleCreateRecommendation = (e: React.FormEvent) => {
    e.preventDefault();
    const flatObj = flats.find(f => f.id === newRec.flatId);
    const recObj: VendorRecommendation = {
      id: `REC-${Date.now().toString().slice(-4)}`,
      flatId: newRec.flatId,
      residentName: flatObj?.ownerName || 'Resident',
      serviceCategory: newRec.serviceCategory,
      vendorName: newRec.vendorName,
      vendorPhone: newRec.vendorPhone,
      rating: Number(newRec.rating),
      reviewText: newRec.reviewText,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [recObj, ...recommendations];
    setRecommendations(updated);
    StorageEngine.saveRecommendations(updated);
    setIsRecModalOpen(false);
  };

  const handleCreateCarpool = (e: React.FormEvent) => {
    e.preventDefault();
    const cpObj: CarpoolRoute = {
      id: `CP-${Date.now().toString().slice(-4)}`,
      flatId: newCarpool.flatId,
      driverName: newCarpool.driverName,
      destination: newCarpool.destination,
      departureTime: newCarpool.departureTime,
      availableSeats: Number(newCarpool.availableSeats),
      notes: newCarpool.notes,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      phone: newCarpool.phone
    };

    const updated = [cpObj, ...carpools];
    setCarpools(updated);
    StorageEngine.saveCarpools(updated);
    setIsCarpoolModalOpen(false);
  };

  const handleTogglePrivacy = (profileId: string) => {
    const updated = profiles.map(p => p.id === profileId ? { ...p, showPhoneToNeighbours: !p.showPhoneToNeighbours } : p);
    setProfiles(updated);
    StorageEngine.saveSocialProfiles(updated);
  };

  const handleJoinGroup = (groupId: string) => {
    const updated = groups.map(g => {
      if (g.id === groupId) {
        const isJoined = g.joinedFlatIds.includes('A-101');
        return {
          ...g,
          membersCount: isJoined ? g.membersCount - 1 : g.membersCount + 1,
          joinedFlatIds: isJoined ? g.joinedFlatIds.filter(id => id !== 'A-101') : [...g.joinedFlatIds, 'A-101']
        };
      }
      return g;
    });
    setGroups(updated);
    StorageEngine.saveGroups(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Banner */}
      <div className="card card-sage" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-sage" style={{ marginBottom: '0.4rem' }}>MODULE 09</span>
          <h2>🤝 Community & Social Hub</h2>
          <p style={{ fontSize: '0.9rem', color: '#031D34' }}>
            MC-Verified resident profiles, layout newsfeed, neighbour marketplace, vendor reviews, lost & found, carpooling, and interest groups.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => setIsPostModalOpen(true)} className="btn btn-primary">
            <Plus size={16} /> New Community Post
          </button>
          <button onClick={() => setIsMarketModalOpen(true)} className="btn btn-amber">
            <ShoppingBag size={16} /> Post Marketplace Item
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{ display: 'flex', borderBottom: '2px solid #CBD5E1', gap: '1.25rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
        {[
          { id: 'feed', label: `📰 Community Feed (${posts.length})` },
          { id: 'marketplace', label: `🛒 Marketplace (${marketplace.length})` },
          { id: 'lost_found', label: `🔍 Lost & Found (${lostFound.length})` },
          { id: 'recommendations', label: `🏷️ Vendor Reviews (${recommendations.length})` },
          { id: 'carpool', label: `🚗 Carpooling (${carpools.length})` },
          { id: 'groups', label: `👨‍👩‍👧 Interest Groups (${groups.length})` },
          { id: 'profiles', label: `👤 Resident Directory (${profiles.length})` }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            style={{
              background: 'none', border: 'none', padding: '0.6rem 0.2rem', fontWeight: 700, fontSize: '0.9rem',
              whiteSpace: 'nowrap',
              borderBottom: activeTab === t.id ? '3px solid #0B4769' : 'none',
              color: activeTab === t.id ? '#0B4769' : '#64748B', cursor: 'pointer'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 1. COMMUNITY FEED TAB */}
      {activeTab === 'feed' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {posts.map((post) => (
            <div key={post.id} className="card" style={{ borderLeft: post.isPinned ? '5px solid #E9BB76' : '1px solid rgba(11, 71, 105, 0.12)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ background: '#0B4769', color: '#FFF', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    {post.authorName.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      {post.authorName}
                      <span className="badge badge-ocean" style={{ fontSize: '0.7rem' }}>Flat {post.flatId}</span>
                      <span title="MC-Verified Resident"><ShieldCheck size={14} style={{ color: '#31532C' }} /></span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{post.createdAt}</span>
                  </div>
                </div>

                <span className={`badge ${post.category === 'Good News' ? 'badge-sage' : post.category === 'Alert' ? 'badge-overdue' : 'badge-ocean'}`}>
                  {post.category}
                </span>
              </div>

              <p style={{ fontSize: '0.95rem', color: '#031D34', lineHeight: 1.5, margin: '0.5rem 0 1rem 0' }}>
                {post.content}
              </p>

              {/* Likes & Comments Count */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '0.75rem' }}>
                <button
                  onClick={() => handleLikePost(post.id)}
                  className={`btn btn-sm ${post.likedFlatIds.includes('A-101') ? 'btn-primary' : 'btn-outline'}`}
                >
                  <ThumbsUp size={14} /> {post.likesCount} Likes
                </button>
                <span style={{ fontSize: '0.85rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <MessageCircle size={14} /> {post.comments.length} Comments
                </span>
              </div>

              {/* Comments Section */}
              {post.comments.length > 0 && (
                <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {post.comments.map((c) => (
                    <div key={c.id} style={{ fontSize: '0.85rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.35rem' }}>
                      <strong style={{ color: '#0B4769' }}>{c.authorName} ({c.flatId}):</strong> {c.commentText}
                    </div>
                  ))}
                </div>
              )}

              {/* Add Comment Input */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="form-control"
                  style={{ fontSize: '0.85rem' }}
                  value={commentInputs[post.id] || ''}
                  onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(post.id); }}
                />
                <button onClick={() => handleAddComment(post.id)} className="btn btn-sm btn-secondary">
                  Comment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. MARKETPLACE TAB */}
      {activeTab === 'marketplace' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>🛒 Layout Neighbour Marketplace (Verified Residents Only)</h3>
            <button onClick={() => setIsMarketModalOpen(true)} className="btn btn-amber">
              <Plus size={16} /> Post Listing
            </button>
          </div>

          <div className="grid-3">
            {marketplace.map((item) => (
              <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-sage">{item.category}</span>
                  {item.isFreeToTake ? (
                    <span className="badge badge-paid" style={{ fontWeight: 800 }}>FREE TO TAKE</span>
                  ) : (
                    <strong style={{ color: '#0B4769', fontSize: '1.2rem' }}>₹{item.price.toLocaleString()}</strong>
                  )}
                </div>

                <h4 style={{ color: '#031D34' }}>{item.title}</h4>
                <p style={{ fontSize: '0.875rem', color: '#475569' }}>{item.description}</p>

                <div style={{ background: '#F8FAFC', padding: '0.65rem', borderRadius: '6px', fontSize: '0.8rem', marginTop: 'auto' }}>
                  <div><strong>Seller:</strong> {item.sellerName} (Flat {item.flatId})</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#0B4769', marginTop: '0.2rem', fontWeight: 600 }}>
                    <Phone size={12} /> Contact: {item.contactPhone}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. LOST & FOUND TAB */}
      {activeTab === 'lost_found' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>🔍 Layout Lost & Found Board</h3>
            <button onClick={() => setIsLostModalOpen(true)} className="btn btn-primary">
              <Plus size={16} /> Report Item
            </button>
          </div>

          <div className="grid-2">
            {lostFound.map((lf) => (
              <div key={lf.id} className="card" style={{ borderLeft: lf.type === 'Lost' ? '5px solid #991B1B' : '5px solid #31532C' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span className={`badge ${lf.type === 'Lost' ? 'badge-overdue' : 'badge-paid'}`}>
                    {lf.type.toUpperCase()} ITEM
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Reported: {lf.date}</span>
                </div>

                <h4 style={{ color: '#031D34', marginBottom: '0.25rem' }}>{lf.title}</h4>
                <p style={{ fontSize: '0.875rem', color: '#475569' }}>{lf.description}</p>

                <div style={{ background: '#F8FAFC', padding: '0.65rem', borderRadius: '6px', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                  <div><strong>Location:</strong> {lf.location}</div>
                  <div><strong>Contact:</strong> {lf.contactName} ({lf.flatId}) · {lf.contactPhone}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. VENDOR RECOMMENDATIONS TAB */}
      {activeTab === 'recommendations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>🏷️ Trusted Vendor Recommendations</h3>
            <button onClick={() => setIsRecModalOpen(true)} className="btn btn-secondary">
              <Plus size={16} /> Recommend Vendor
            </button>
          </div>

          <div className="grid-2">
            {recommendations.map((rec) => (
              <div key={rec.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span className="badge badge-ocean">{rec.serviceCategory}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#B45309' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < rec.rating ? '#F59E0B' : 'none'} color="#F59E0B" />
                    ))}
                  </div>
                </div>

                <h4 style={{ color: '#0B4769' }}>{rec.vendorName}</h4>
                <p style={{ fontSize: '0.85rem', color: '#031D34', fontWeight: 600 }}>📞 {rec.vendorPhone}</p>
                <p style={{ fontSize: '0.875rem', color: '#475569', fontStyle: 'italic', marginTop: '0.35rem' }}>"{rec.reviewText}"</p>

                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.5rem', textAlign: 'right' }}>
                  Recommended by <strong>{rec.residentName} ({rec.flatId})</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. CARPOOLING TAB */}
      {activeTab === 'carpool' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>🚗 Layout Carpooling & Ride Share</h3>
            <button onClick={() => setIsCarpoolModalOpen(true)} className="btn btn-accent">
              <Plus size={16} /> Post Route
            </button>
          </div>

          <div className="grid-2">
            {carpools.map((cp) => (
              <div key={cp.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <h4 style={{ color: '#0B4769' }}>📍 {cp.destination}</h4>
                  <span className="badge badge-amber">{cp.availableSeats} Seats Open</span>
                </div>

                <div style={{ fontSize: '0.875rem', color: '#031D34', marginBottom: '0.5rem' }}>
                  <div><strong>Driver:</strong> {cp.driverName} (Flat {cp.flatId})</div>
                  <div><strong>Departure:</strong> {cp.departureTime}</div>
                  <div><strong>Operating Days:</strong> {cp.days.join(', ')}</div>
                </div>

                <p style={{ fontSize: '0.85rem', color: '#475569', background: '#F8FAFC', padding: '0.5rem', borderRadius: '6px' }}>{cp.notes}</p>

                <button onClick={() => alert(`Call driver ${cp.driverName} at ${cp.phone}`)} className="btn btn-sm btn-primary" style={{ width: '100%', marginTop: '0.75rem' }}>
                  <Phone size={14} /> Contact Driver ({cp.phone})
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. INTEREST GROUPS TAB */}
      {activeTab === 'groups' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3>👨‍👩‍👧 Layout Interest Groups & Clubs</h3>
          <div className="grid-3">
            {groups.map((grp) => {
              const isJoined = grp.joinedFlatIds.includes('A-101');
              return (
                <div key={grp.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="badge badge-sage">{grp.category}</span>
                    <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>{grp.membersCount} Members</span>
                  </div>

                  <h4 style={{ color: '#0B4769' }}>{grp.name}</h4>
                  <p style={{ fontSize: '0.875rem', color: '#475569' }}>{grp.description}</p>

                  <button
                    onClick={() => handleJoinGroup(grp.id)}
                    className={`btn btn-sm ${isJoined ? 'btn-outline' : 'btn-primary'}`}
                    style={{ marginTop: 'auto' }}
                  >
                    {isJoined ? 'Joined Club' : 'Join Group'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. RESIDENT PROFILES TAB */}
      {activeTab === 'profiles' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3>👤 Verified Resident Directory & Privacy Profiles</h3>
          <div className="grid-2">
            {profiles.map((p) => (
              <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      {p.photoUrl ? (
                        <img
                          src={p.photoUrl}
                          alt={p.name}
                          style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${p.avatarColor}` }}
                        />
                      ) : (
                        <div style={{ background: p.avatarColor, color: '#FFF', width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem' }}>
                          {p.name.charAt(0)}
                        </div>
                      )}
                      <label
                        title="Upload Profile Photo"
                        style={{
                          position: 'absolute', bottom: '-4px', right: '-4px',
                          background: '#E9BB76', color: '#031D34', border: '1px solid #FFF',
                          borderRadius: '50%', width: '22px', height: '22px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                        }}
                      >
                        <Camera size={11} />
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                if (typeof reader.result === 'string') {
                                  const updated = profiles.map(pr => pr.id === p.id ? { ...pr, photoUrl: reader.result as string } : pr);
                                  setProfiles(updated);
                                  StorageEngine.saveSocialProfiles(updated);
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>

                    <div>
                      <h4 style={{ color: '#031D34', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        {p.name}
                        {p.isMcVerified && <span title="MC Verified"><ShieldCheck size={16} style={{ color: '#31532C' }} /></span>}
                      </h4>
                      <span className="badge badge-ocean">Flat {p.flatId} · Resident since {p.moveInYear}</span>
                    </div>
                  </div>

                  {p.flatId === 'A-101' && (
                    <button onClick={() => handleTogglePrivacy(p.id)} className="btn btn-sm btn-outline" style={{ fontSize: '0.75rem' }}>
                      {p.showPhoneToNeighbours ? <Eye size={12} /> : <EyeOff size={12} />}
                      {p.showPhoneToNeighbours ? 'Phone Visible' : 'Phone Hidden'}
                    </button>
                  )}
                </div>

                <p style={{ fontSize: '0.875rem', color: '#475569', fontStyle: 'italic' }}>"{p.aboutMe}"</p>

                <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <div><strong>Profession:</strong> {p.profession}</div>
                  <div><strong>Languages:</strong> {p.languages.join(', ')}</div>
                  <div><strong>Hobbies:</strong> {p.hobbies.join(', ')}</div>
                  <div><strong>Family Members:</strong> {p.familyMembers.join(' · ')}</div>
                  <div><strong>Phone:</strong> {p.showPhoneToNeighbours ? p.phone : 'Hidden by Resident Privacy Settings'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* MODAL: POST COMMUNITY FEED */}
      {isPostModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create Layout Community Post</h3>
              <button onClick={() => setIsPostModalOpen(false)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <form onSubmit={handleCreatePost} className="modal-body">
              <div className="form-group">
                <label>Category</label>
                <select
                  className="form-control"
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value as any })}
                >
                  <option value="General">General</option>
                  <option value="Good News">Good News</option>
                  <option value="Help Needed">Help Needed</option>
                  <option value="Alert">Alert</option>
                  <option value="Question">Question</option>
                </select>
              </div>

              <div className="form-group">
                <label>Post Content</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share updates, news, or questions with neighbours..."
                  className="form-control"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Publish Post
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: MARKETPLACE ITEM */}
      {isMarketModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Post Marketplace Item</h3>
              <button onClick={() => setIsMarketModalOpen(false)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <form onSubmit={handleCreateMarketItem} className="modal-body">
              <div className="form-group">
                <label>Item Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Baby High Chair / Bicycle"
                  className="form-control"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    className="form-control"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
                  >
                    <option value="Baby Gear">Baby Gear</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Appliances">Appliances</option>
                    <option value="Books & Games">Books & Games</option>
                    <option value="Sports">Sports</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    disabled={newItem.isFreeToTake}
                    className="form-control"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                  />
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontWeight: 700, color: '#31532C' }}>
                <input
                  type="checkbox"
                  checked={newItem.isFreeToTake}
                  onChange={(e) => setNewItem({ ...newItem, isFreeToTake: e.target.checked, price: 0 })}
                /> Mark as "Free to Take" Giveaway
              </label>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Item condition, pick up location..."
                  className="form-control"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-amber" style={{ width: '100%', marginTop: '1rem' }}>
                List Item for Neighbours
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: LOST AND FOUND */}
      {isLostModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Report Lost or Found Item</h3>
              <button onClick={() => setIsLostModalOpen(false)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <form onSubmit={handleCreateLostFound} className="modal-body">
              <div className="grid-2">
                <div className="form-group">
                  <label>Report Type</label>
                  <select
                    className="form-control"
                    value={newLF.type}
                    onChange={(e) => setNewLF({ ...newLF, type: e.target.value as any })}
                  >
                    <option value="Lost">Lost Item / Pet</option>
                    <option value="Found">Found Item</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lost Dog Collar / Found Keys"
                    className="form-control"
                    value={newLF.title}
                    onChange={(e) => setNewLF({ ...newLF, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Location Spot</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Central Park Walkway / Swimming Pool"
                  className="form-control"
                  value={newLF.location}
                  onChange={(e) => setNewLF({ ...newLF, location: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Provide color, brand, or identifying details..."
                  className="form-control"
                  value={newLF.description}
                  onChange={(e) => setNewLF({ ...newLF, description: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Submit Report
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RECOMMENDATION */}
      {isRecModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Recommend Vendor / Service Provider</h3>
              <button onClick={() => setIsRecModalOpen(false)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <form onSubmit={handleCreateRecommendation} className="modal-body">
              <div className="grid-2">
                <div className="form-group">
                  <label>Service Category</label>
                  <select
                    className="form-control"
                    value={newRec.serviceCategory}
                    onChange={(e) => setNewRec({ ...newRec, serviceCategory: e.target.value as any })}
                  >
                    <option value="Plumber">Plumber</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Tutor">Tutor</option>
                    <option value="Painter">Painter</option>
                    <option value="Carpenter">Carpenter</option>
                    <option value="AC Service">AC Service</option>
                    <option value="Car Wash">Car Wash</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Vendor Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Name / Business"
                    className="form-control"
                    value={newRec.vendorName}
                    onChange={(e) => setNewRec({ ...newRec, vendorName: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Vendor Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 99000 00000"
                    className="form-control"
                    value={newRec.vendorPhone}
                    onChange={(e) => setNewRec({ ...newRec, vendorPhone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Rating (1 to 5 Stars)</label>
                  <select
                    className="form-control"
                    value={newRec.rating}
                    onChange={(e) => setNewRec({ ...newRec, rating: Number(e.target.value) })}
                  >
                    <option value={5}>5 Stars (Excellent)</option>
                    <option value={4}>4 Stars (Good)</option>
                    <option value={3}>3 Stars (Average)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Review & Work Done</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your experience with this vendor..."
                  className="form-control"
                  value={newRec.reviewText}
                  onChange={(e) => setNewRec({ ...newRec, reviewText: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem' }}>
                Post Verified Recommendation
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CARPOOL */}
      {isCarpoolModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Post Carpool Route</h3>
              <button onClick={() => setIsCarpoolModalOpen(false)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <form onSubmit={handleCreateCarpool} className="modal-body">
              <div className="grid-2">
                <div className="form-group">
                  <label>Destination</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Whitefield / Electronic City"
                    className="form-control"
                    value={newCarpool.destination}
                    onChange={(e) => setNewCarpool({ ...newCarpool, destination: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Departure Time</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 08:30 AM"
                    className="form-control"
                    value={newCarpool.departureTime}
                    onChange={(e) => setNewCarpool({ ...newCarpool, departureTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Available Seats</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={6}
                    className="form-control"
                    value={newCarpool.availableSeats}
                    onChange={(e) => setNewCarpool({ ...newCarpool, availableSeats: Number(e.target.value) })}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={newCarpool.phone}
                    onChange={(e) => setNewCarpool({ ...newCarpool, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Route Details & Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Non-smoking EV car via Varthur road"
                  className="form-control"
                  value={newCarpool.notes}
                  onChange={(e) => setNewCarpool({ ...newCarpool, notes: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-accent" style={{ width: '100%', marginTop: '1rem' }}>
                Publish Ride Share Route
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
