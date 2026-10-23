# server/admin_router.py
# FastAPI Python Router for CalabarPass Admin Moderation & Merchant Review

import time
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel

router = APIRouter(prefix="/api/admin", tags=["Admin Moderation"])

# Email utility stub / integration
def send_transactional_email(to_email: str, subject: str, body: str):
    """
    Dispatches a transactional email to the verified merchant address.
    Replace with your SendGrid, AWS SES, Resend, or SMTP client.
    """
    print(f"\n[EMAIL DISPATCHED] To: {to_email} | Subject: {subject}\n{body}\n")

# Pydantic schema for pending vendor response
class PendingVendorOut(BaseModel):
    id: str
    business_name: str
    category: str
    phone: str
    email: str
    bankPayoutDetails: Optional[str] = None
    status: str = "pending"

@router.get("/vendors/pending", response_model=List[dict])
async def get_pending_merchants():
    """
    Fetch all incoming merchant self-onboarding applications sitting in the pending review queue.
    """
    # Example database query: db.query(Vendor).filter(Vendor.status == "pending").all()
    # Replace with your actual ORM session call:
    return [
        {
            "id": "vnd-marina-bay-sunset-mvl891a",
            "business_name": "Marina Bay Sunset Grill & Bar",
            "category": "dining-nightlife",
            "phone": "+234 803 111 8822",
            "email": "manager@marinabaysunset.com",
            "bankPayoutDetails": "Zenith Bank - 1092837190",
            "status": "pending"
        },
        {
            "id": "vnd-oban-rainforest-lodge-mvl902b",
            "business_name": "Oban Rainforest Canopy Lodge",
            "category": "eco-sites",
            "phone": "+234 814 220 3311",
            "email": "bookings@obanrainforest.org",
            "bankPayoutDetails": "Access Bank - 9028172635",
            "status": "pending"
        }
    ]

@router.post("/vendors/{vendor_id}/review")
async def review_merchant_application(
    vendor_id: str, 
    action: str = Query(..., description="'approve' or 'remove'"),
    # db: Session = Depends(get_db)
):
    """
    Review a pending merchant registration.
    - 'approve': updates status to approved, generates official CAL-CAT-TIMESTAMP code, and dispatches approval email.
    - 'remove': updates status to removed and dispatches rejection email.
    """
    # In your SQLAlchemy model setup:
    # vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()
    # if not vendor:
    #     raise HTTPException(status_code=404, detail="Vendor not found.")

    if action == "approve":
        merchant_code = f"CAL-MER-{int(time.time())}"
        
        # Trigger Approval Email
        send_transactional_email(
            to_email="merchant@example.com",
            subject="🎉 Your CalabarPass Merchant Account is Approved!",
            body=f"Hello Merchant,\n\nYour business has been verified by the CalabarPass administration. Your official state merchant code is {merchant_code}. You can now log into your Vendor Settlement Terminal and accept escrow payments."
        )
        
    elif action == "remove":
        # Trigger Removal / Rejection Email
        send_transactional_email(
            to_email="merchant@example.com",
            subject="Update Regarding Your CalabarPass Registration",
            body="Hello Merchant,\n\nAfter reviewing your submission, your listing could not be verified at this time as it did not meet our state compliance and security standards. If you believe this is an error, please reach out to support."
        )
    else:
        raise HTTPException(status_code=400, detail="Invalid action parameter.")

    # db.commit()
    return {"status": "success", "message": f"Vendor successfully {action}d."}
